"use client";
// React
import { use, useEffect, useMemo, useState } from "react";

// Next.js
import Link from "next/link";
import { useRouter } from "next/navigation";

// Third-party
import { ArrowLeft, Plus } from "lucide-react";

// UI Components
import { Button } from "@/components/ui/button";
import { ConfirmDialog } from "@/components/ui/confirm-dialog";
import { Modal } from "@/components/ui/modal";
import { showToast } from "@/components/ui/toast";

// Types
import type { JsonObject } from "@/shared/types/json";

// Lib
import { ApiError } from "@/lib/api/errors";

// Shared
import { applyServerErrors } from "@/shared/utils/forms/apply-server-errors";

// Pages Feature
import { usePage } from "@/features/pages/hooks/use-page";

// Page Sections Components
import {
  PageSectionForm,
  PageSectionList,
  SectionContentModal,
} from "@/features/page-sections/components";

// Page Sections Hooks
import { useCreatePageSection } from "@/features/page-sections/hooks/use-create-page-section";
import { useDeletePageSection } from "@/features/page-sections/hooks/use-delete-page-section";
import { usePageSection } from "@/features/page-sections/hooks/use-page-section";
import { usePageSectionForm } from "@/features/page-sections/hooks/use-page-section-form";
import { usePageSections } from "@/features/page-sections/hooks/use-page-sections";
import { useUpdatePageSection } from "@/features/page-sections/hooks/use-update-page-section";

// Page Sections Schema
import {
  DEFAULT_PAGE_SECTION_FORM_VALUES,
  PageSectionFormValues,
} from "@/features/page-sections/schemas/page-section-form.schema";
import {
  parseOptionalSectionContent,
  parseRequiredSectionContent,
  stringifyOptionalSectionContent,
  stringifySectionContent,
} from "@/features/page-sections/schemas/page-section.utils";

import type {
  CreatePageSectionRequest,
  PageSection,
  PageSectionListItem,
} from "@/features/page-sections/types/page-section.types";

const PAGE_SECTION_FORM_ID = "page-section-form";

export default function SectionsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);

  const router = useRouter();
  const pageId = Number(id);

  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isContentModalOpen, setIsContentModalOpen] = useState(false);
  const [editingSectionId, setEditingSectionId] = useState<number | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<PageSectionListItem | null>(
    null,
  );
  const [updatingSectionId, setUpdatingSectionId] = useState<number | null>(
    null,
  );

  const form = usePageSectionForm();
  const { reset } = form;

  const pageQuery = usePage(pageId);
  const sectionsQuery = usePageSections(pageId);
  const sectionQuery = usePageSection(editingSectionId);

  const createSectionMutation = useCreatePageSection(pageId);
  const updateSectionMutation = useUpdatePageSection(pageId);
  const deleteSectionMutation = useDeletePageSection(pageId);

  const page = pageQuery.data?.data;
  const sections = useMemo(
    () => sectionsQuery.data?.data ?? [],
    [sectionsQuery.data?.data],
  );

  const nextSortOrder = useMemo(() => {
    if (sections.length === 0) return 0;
    return Math.max(...sections.map((section) => section.sortOrder)) + 1;
  }, [sections]);

  // Open create modal
  const openCreate = () => {
    setEditingSectionId(null);
    reset({
      ...DEFAULT_PAGE_SECTION_FORM_VALUES,
      sortOrder: nextSortOrder,
    });
    setIsCreateModalOpen(true);
  };

  // Open content edit modal (structured form)
  const openEdit = (section: PageSectionListItem) => {
    setEditingSectionId(section.id);
    setIsContentModalOpen(true);
  };

  const closeCreateModal = () => {
    setIsCreateModalOpen(false);
    setEditingSectionId(null);
    reset(DEFAULT_PAGE_SECTION_FORM_VALUES);
  };

  const closeContentModal = () => {
    setIsContentModalOpen(false);
    setEditingSectionId(null);
  };

  useEffect(() => {
    const section = sectionQuery.data?.data.section;

    if (!section || !isCreateModalOpen || !editingSectionId) return;

    reset({
      sectionType: section.sectionType,
      content: stringifySectionContent(section.content),
      settings: stringifyOptionalSectionContent(section.settings),
      sortOrder: section.sortOrder,
      status: section.status,
    });
  }, [editingSectionId, isCreateModalOpen, reset, sectionQuery.data]);

  const toCreateMutationPayload = (
    values: PageSectionFormValues,
  ): CreatePageSectionRequest => ({
    sectionType: values.sectionType,
    content: parseRequiredSectionContent(values.content),
    settings: parseOptionalSectionContent(values.settings),
    sortOrder: values.sortOrder,
    status: values.status,
  });


  // Create form submit (raw JSON form)
  const handleCreateSubmit = async (values: PageSectionFormValues) => {
    try {
      await createSectionMutation.mutateAsync(
        toCreateMutationPayload(values),
      );
      showToast("Section created successfully", "success");
      closeCreateModal();
    } catch (error) {
      if (error instanceof ApiError) {
        applyServerErrors(form, error.errors);
        showToast(error.message, "error");
        return;
      }

      showToast("Failed to create section", "error");
    }
  };

  // Content modal submit (structured form)
  const handleContentSubmit = async ({ content, settings }: { content: JsonObject; settings: JsonObject }) => {
    if (!editingSectionId) return;

    try {
      await updateSectionMutation.mutateAsync({
        sectionId: editingSectionId,
        data: { content, settings },
      });
      showToast("Section updated successfully", "success");
      closeContentModal();
    } catch (error) {
      showToast(
        error instanceof ApiError ? error.message : "Failed to save section",
        "error",
      );
    }
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;

    try {
      await deleteSectionMutation.mutateAsync(deleteTarget.id);
      showToast("Section deleted successfully", "success");
      setDeleteTarget(null);
    } catch (error) {
      showToast(
        error instanceof ApiError ? error.message : "Failed to delete section",
        "error",
      );
    }
  };

  const handleToggleStatus = async (section: PageSectionListItem) => {
    setUpdatingSectionId(section.id);

    try {
      const newStatus = section.status === "published" ? "draft" : "published";
      await updateSectionMutation.mutateAsync({
        sectionId: section.id,
        data: {
          status: newStatus,
        },
      });
      showToast(
        `Section ${newStatus === "published" ? "published" : "moved to draft"} successfully`,
        "success",
      );
    } catch (error) {
      showToast(
        error instanceof ApiError ? error.message : "Failed to update section",
        "error",
      );
    } finally {
      setUpdatingSectionId(null);
    }
  };

  const isInvalidPageId = !Number.isInteger(pageId) || pageId <= 0;
  const isCreateSaving = createSectionMutation.isPending;
  const isContentSaving = updateSectionMutation.isPending;

  // Derive the editing section's data for the content modal
  const editingSection: PageSection | null =
    sectionQuery.data?.data.section ?? null;
  const editingSectionContent: JsonObject =
    (editingSection?.content as JsonObject) ?? {};
  const editingSectionSettings: JsonObject =
    (editingSection?.settings as JsonObject) ?? {};
  const isContentLoading = Boolean(
    editingSectionId && sectionQuery.isPending,
  );

  // Invalid page id handler
  if (isInvalidPageId) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <p className="text-muted-foreground">Invalid page id</p>
        <Link
          href="/admin/pages"
          className="mt-2 text-sm text-accent hover:underline"
        >
          Back to Pages
        </Link>
      </div>
    );
  }

  // Page loading handler
  if (pageQuery.isPending) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-accent border-t-transparent" />
        <p className="mt-3 text-sm text-muted-foreground">Loading page...</p>
      </div>
    );
  }

  //
  if (pageQuery.isError || !page) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <p className="text-muted-foreground">Page not found</p>
        <Link
          href="/admin/pages"
          className="mt-2 text-sm text-accent hover:underline"
        >
          Back to Pages
        </Link>
      </div>
    );
  }

  // Page sections UI
  return (
    <div className="animate-fade-in">
      <div className="mb-6">
        <button
          onClick={() => router.push("/admin/pages")}
          className="mb-4 flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft size={16} />
          Back to {page.title}
        </button>

        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <h1 className="text-2xl font-bold text-foreground">
              Page Sections
            </h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Manage sections for {page.title} - {sections.length}{" "}
              {sections.length === 1 ? "section" : "sections"}
            </p>
          </div>
          <Button size="md" onClick={openCreate}>
            <Plus size={16} />
            Add Section
          </Button>
        </div>
      </div>

      <PageSectionList
        sections={sections}
        isLoading={sectionsQuery.isPending}
        onCreate={openCreate}
        onEdit={openEdit}
        onDelete={setDeleteTarget}
        onToggleStatus={handleToggleStatus}
        updatingSectionId={updatingSectionId}
      />

      {/* Create modal — uses existing raw JSON form */}
      <Modal
        isOpen={isCreateModalOpen}
        onClose={closeCreateModal}
        title="Add Section"
        size="lg"
        footer={
          <div className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-end sm:gap-3">
            <Button
              type="button"
              variant="secondary"
              size="sm"
              className="w-full sm:w-auto"
              disabled={isCreateSaving}
              onClick={closeCreateModal}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              form={PAGE_SECTION_FORM_ID}
              size="sm"
              className="w-full sm:w-auto"
              isLoading={isCreateSaving}
            >
              Add Section
            </Button>
          </div>
        }
      >
        <PageSectionForm
          formId={PAGE_SECTION_FORM_ID}
          form={form}
          onSubmit={handleCreateSubmit}
          onCancel={closeCreateModal}
          submitLabel="Add Section"
          isSubmitting={isCreateSaving}
          hideActions
        />
      </Modal>

      {/* Edit modal — uses dynamic structured form */}
      <SectionContentModal
        isOpen={isContentModalOpen}
        onClose={closeContentModal}
        onSubmit={handleContentSubmit}
        sectionType={editingSection?.sectionType ?? null}
        content={editingSectionContent}
        settings={editingSectionSettings}
        isSubmitting={isContentSaving}
        isLoading={isContentLoading}
      />

      <ConfirmDialog
        isOpen={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleDelete}
        title="Delete Section"
        message={`Are you sure you want to delete "${deleteTarget?.sectionType}"? This action cannot be undone.`}
      />
    </div>
  );
}
