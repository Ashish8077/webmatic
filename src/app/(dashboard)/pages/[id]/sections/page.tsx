"use client";

import { useEffect, useMemo, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Modal } from "@/components/ui/modal";
import { ConfirmDialog } from "@/components/ui/confirm-dialog";
import { showToast } from "@/components/ui/toast";
import { ApiError } from "@/lib/api/errors";
import { applyServerErrors } from "@/shared/utils/forms/apply-server-errors";
import { usePage } from "@/features/pages/hooks/use-page";
import {
  PageSectionForm,
  PageSectionList,
} from "@/features/page-sections/components";
import {
  DEFAULT_PAGE_SECTION_FORM_VALUES,
  parseSectionContent,
  stringifySectionContent,
  type PageSectionFormValues,
} from "@/features/page-sections/schemas/page-section.schema";

import { useCreatePageSection } from "@/features/page-sections/hooks/use-create-page-section";
import { useDeletePageSection } from "@/features/page-sections/hooks/use-delete-page-section";
import { usePageSection } from "@/features/page-sections/hooks/use-page-section";
import { usePageSectionForm } from "@/features/page-sections/hooks/use-page-section-form";
import { usePageSections } from "@/features/page-sections/hooks/use-page-sections";
import { useUpdatePageSection } from "@/features/page-sections/hooks/use-update-page-section";
import type {
  CreatePageSectionRequest,
  PageSectionListItem,
} from "@/features/page-sections/types/page-section.types";

export default function SectionsPage() {
  const { id } = useParams<{ id: string }>();

  const router = useRouter();
  const pageId = Number(id);

  const [isModalOpen, setIsModalOpen] = useState(false);
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

  const openCreate = () => {
    setEditingSectionId(null);
    reset({
      ...DEFAULT_PAGE_SECTION_FORM_VALUES,
      sortOrder: nextSortOrder,
    });
    setIsModalOpen(true);
  };

  const openEdit = (section: PageSectionListItem) => {
    setEditingSectionId(section.id);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingSectionId(null);
    reset(DEFAULT_PAGE_SECTION_FORM_VALUES);
  };

  useEffect(() => {
    const section = sectionQuery.data?.data.section;

    if (!section || !isModalOpen || !editingSectionId) return;

    reset({
      sectionType: section.sectionType,
      content: stringifySectionContent(section.content),
      settings: stringifySectionContent(section.settings),
      sortOrder: section.sortOrder,
      status: section.status,
    });
  }, [editingSectionId, isModalOpen, reset, sectionQuery.data]);

  const toMutationPayload = (
    values: PageSectionFormValues,
  ): CreatePageSectionRequest => ({
    sectionType: values.sectionType,
    content: parseSectionContent(values.content)!,
    settings: parseSectionContent(values.settings),
    sortOrder: values.sortOrder,
    status: values.status,
  });

  const handleSubmit = async (values: PageSectionFormValues) => {
    try {
      const payload = toMutationPayload(values);

      if (editingSectionId) {
        await updateSectionMutation.mutateAsync({
          sectionId: editingSectionId,
          data: payload,
        });
        showToast("Section updated successfully", "success");
      } else {
        await createSectionMutation.mutateAsync(payload);
        showToast("Section created successfully", "success");
      }

      closeModal();
    } catch (error) {
      if (error instanceof ApiError) {
        applyServerErrors(form, error.errors);
        showToast(error.message, "error");
        return;
      }

      showToast("Failed to save section", "error");
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
  const isSaving =
    createSectionMutation.isPending || updateSectionMutation.isPending;

  if (isInvalidPageId) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <p className="text-muted-foreground">Invalid page id</p>
        <Link
          href="/pages"
          className="mt-2 text-sm text-accent hover:underline"
        >
          Back to Pages
        </Link>
      </div>
    );
  }

  if (pageQuery.isPending) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-accent border-t-transparent" />
        <p className="mt-3 text-sm text-muted-foreground">Loading page...</p>
      </div>
    );
  }

  if (pageQuery.isError || !page) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <p className="text-muted-foreground">Page not found</p>
        <Link
          href="/pages"
          className="mt-2 text-sm text-accent hover:underline"
        >
          Back to Pages
        </Link>
      </div>
    );
  }

  return (
    <div className="animate-fade-in">
      <div className="mb-6">
        <button
          onClick={() => router.push("/pages")}
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

      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        title={editingSectionId ? "Edit Section" : "Add Section"}
        size="lg"
      >
        <PageSectionForm
          form={form}
          onSubmit={handleSubmit}
          onCancel={closeModal}
          submitLabel={editingSectionId ? "Save Changes" : "Add Section"}
          isLoading={Boolean(editingSectionId && sectionQuery.isPending)}
          isSubmitting={isSaving}
          isEditing={!!editingSectionId}
        />
      </Modal>

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
