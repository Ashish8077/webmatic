"use client";

import { useState, use } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  dummyPages,
  dummySections,
  generateSectionId,
  type DummySection,
} from "@/lib/dummy-data";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Modal } from "@/components/ui/modal";
import { ConfirmDialog } from "@/components/ui/confirm-dialog";
import { showToast } from "@/components/ui/toast";

interface SectionForm {
  sectionName: string;
  title: string;
  content: string;
  sortOrder: number;
  isActive: boolean;
}

const emptySectionForm: SectionForm = {
  sectionName: "",
  title: "",
  content: "{}",
  sortOrder: 0,
  isActive: true,
};

export default function SectionsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const router = useRouter();
  const pageId = Number(id);
  const page = dummyPages.find((p) => p.id === pageId);

  const [sections, setSections] = useState<DummySection[]>(
    dummySections.filter((s) => s.pageId === pageId).sort((a, b) => a.sortOrder - b.sortOrder),
  );

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingSection, setEditingSection] = useState<DummySection | null>(null);
  const [form, setForm] = useState<SectionForm>(emptySectionForm);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [deleteTarget, setDeleteTarget] = useState<DummySection | null>(null);

  const openCreate = () => {
    setEditingSection(null);
    setForm({
      ...emptySectionForm,
      sortOrder: sections.length,
    });
    setErrors({});
    setIsModalOpen(true);
  };

  const openEdit = (section: DummySection) => {
    setEditingSection(section);
    setForm({
      sectionName: section.sectionName,
      title: section.title || "",
      content: JSON.stringify(section.content, null, 2),
      sortOrder: section.sortOrder,
      isActive: section.isActive,
    });
    setErrors({});
    setIsModalOpen(true);
  };

  const validate = (): boolean => {
    const e: Record<string, string> = {};
    if (!form.sectionName.trim()) e.sectionName = "Section name is required";
    else if (!/^[a-z][a-z0-9]*(?:-[a-z0-9]+)*$/.test(form.sectionName)) {
      e.sectionName = "Use lowercase with hyphens (e.g. hero-banner)";
    }

    try {
      JSON.parse(form.content);
    } catch {
      e.content = "Invalid JSON";
    }

    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSave = () => {
    if (!validate()) return;

    const now = new Date().toISOString();
    let parsedContent: Record<string, unknown> = {};
    try {
      parsedContent = JSON.parse(form.content);
    } catch {
      return;
    }

    if (editingSection) {
      // Update
      setSections((prev) =>
        prev.map((s) =>
          s.id === editingSection.id
            ? {
                ...s,
                sectionName: form.sectionName,
                title: form.title || null,
                content: parsedContent,
                sortOrder: form.sortOrder,
                isActive: form.isActive,
                updatedAt: now,
              }
            : s,
        ),
      );
      showToast(`Section "${form.sectionName}" updated`, "success");
    } else {
      // Create
      const newSection: DummySection = {
        id: generateSectionId(),
        pageId,
        sectionName: form.sectionName,
        title: form.title || null,
        content: parsedContent,
        sortOrder: form.sortOrder,
        isActive: form.isActive,
        createdAt: now,
        updatedAt: now,
      };
      setSections((prev) =>
        [...prev, newSection].sort((a, b) => a.sortOrder - b.sortOrder),
      );
      showToast(`Section "${form.sectionName}" created`, "success");
    }

    setIsModalOpen(false);
  };

  const handleDelete = (section: DummySection) => {
    setSections((prev) => prev.filter((s) => s.id !== section.id));
    showToast(`Section "${section.sectionName}" deleted`, "success");
  };

  const toggleActive = (section: DummySection) => {
    setSections((prev) =>
      prev.map((s) =>
        s.id === section.id ? { ...s, isActive: !s.isActive } : s,
      ),
    );
    showToast(
      `Section "${section.sectionName}" ${section.isActive ? "deactivated" : "activated"}`,
      "success",
    );
  };

  if (!page) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <p className="text-muted-foreground">Page not found</p>
        <Link href="/pages" className="text-accent text-sm mt-2 hover:underline">
          Back to Pages
        </Link>
      </div>
    );
  }

  return (
    <div className="animate-fade-in">
      {/* Header */}
      <div className="mb-6">
        <button
          onClick={() => router.push(`/pages/${pageId}`)}
          className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors mb-4 cursor-pointer"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6" />
          </svg>
          Back to &ldquo;{page.title}&rdquo;
        </button>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-foreground">
              Page Sections
            </h1>
            <p className="text-sm text-muted-foreground mt-1">
              Manage sections for &ldquo;{page.title}&rdquo; · {sections.length}{" "}
              {sections.length === 1 ? "section" : "sections"}
            </p>
          </div>
          <Button size="md" onClick={openCreate}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="12" y1="5" x2="12" y2="19" />
              <line x1="5" y1="12" x2="19" y2="12" />
            </svg>
            Add Section
          </Button>
        </div>
      </div>

      {/* Sections list */}
      {sections.length === 0 ? (
        <div className="bg-card-bg border border-card-border rounded-2xl flex flex-col items-center justify-center py-16">
          <div className="w-12 h-12 rounded-xl bg-surface-hover flex items-center justify-center mb-3">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-muted-foreground">
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
              <line x1="3" y1="9" x2="21" y2="9" />
              <line x1="3" y1="15" x2="21" y2="15" />
            </svg>
          </div>
          <p className="text-sm text-muted-foreground">No sections yet</p>
          <button
            onClick={openCreate}
            className="text-accent text-sm mt-2 hover:underline cursor-pointer"
          >
            Add your first section
          </button>
        </div>
      ) : (
        <div className="space-y-3 stagger-children">
          {sections.map((section) => (
            <div
              key={section.id}
              className={`
                bg-card-bg border rounded-2xl p-5
                transition-all duration-200 hover:border-accent/20 group
                ${section.isActive ? "border-card-border" : "border-card-border/50 opacity-60"}
              `}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2.5 mb-1">
                    {/* Sort order badge */}
                    <span className="flex items-center justify-center w-6 h-6 rounded-md bg-accent/10 text-accent text-xs font-bold">
                      {section.sortOrder}
                    </span>
                    <h3 className="text-sm font-semibold text-foreground truncate">
                      {section.sectionName}
                    </h3>
                    <Badge variant={section.isActive ? "active" : "inactive"}>
                      {section.isActive ? "Active" : "Inactive"}
                    </Badge>
                  </div>
                  {section.title && (
                    <p className="text-sm text-muted-foreground mt-1 ml-8.5">
                      {section.title}
                    </p>
                  )}
                  {/* Content preview */}
                  <div className="mt-2.5 ml-8.5">
                    <pre className="text-xs text-muted-foreground/70 bg-surface rounded-lg px-3 py-2 overflow-hidden max-h-[60px] font-mono">
                      {JSON.stringify(section.content, null, 2).slice(0, 150)}
                      {JSON.stringify(section.content, null, 2).length > 150
                        ? "..."
                        : ""}
                    </pre>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  {/* Toggle active */}
                  <button
                    title={section.isActive ? "Deactivate" : "Activate"}
                    onClick={() => toggleActive(section)}
                    className={`p-2 rounded-lg transition-all cursor-pointer ${
                      section.isActive
                        ? "text-success hover:bg-success/10"
                        : "text-muted-foreground hover:bg-success/10 hover:text-success"
                    }`}
                  >
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      {section.isActive ? (
                        <>
                          <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                          <circle cx="12" cy="12" r="3" />
                        </>
                      ) : (
                        <>
                          <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" />
                          <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
                          <line x1="1" y1="1" x2="23" y2="23" />
                        </>
                      )}
                    </svg>
                  </button>

                  {/* Edit */}
                  <button
                    title="Edit"
                    onClick={() => openEdit(section)}
                    className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-surface-hover transition-all cursor-pointer"
                  >
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                    </svg>
                  </button>

                  {/* Delete */}
                  <button
                    title="Delete"
                    onClick={() => setDeleteTarget(section)}
                    className="p-2 rounded-lg text-muted-foreground hover:text-danger hover:bg-danger/10 transition-all cursor-pointer"
                  >
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="3 6 5 6 21 6" />
                      <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Create/Edit Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingSection ? "Edit Section" : "Add Section"}
        size="lg"
      >
        <div className="space-y-5">
          <Input
            label="Section Name"
            placeholder="hero-banner"
            value={form.sectionName}
            onChange={(e) => {
              setForm((prev) => ({ ...prev, sectionName: e.target.value }));
              setErrors((prev) => ({ ...prev, sectionName: "" }));
            }}
            error={errors.sectionName}
            hint="Lowercase with hyphens (e.g. hero-banner, features-grid)"
          />

          <Input
            label="Title (optional)"
            placeholder="Display title for this section"
            value={form.title}
            onChange={(e) =>
              setForm((prev) => ({ ...prev, title: e.target.value }))
            }
          />

          <Textarea
            label="Content (JSON)"
            placeholder='{"heading": "Hello", "text": "..."}'
            value={form.content}
            onChange={(e) => {
              setForm((prev) => ({ ...prev, content: e.target.value }));
              setErrors((prev) => ({ ...prev, content: "" }));
            }}
            error={errors.content}
            className="font-mono text-xs min-h-[160px]"
          />

          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Sort Order"
              type="number"
              min={0}
              value={form.sortOrder}
              onChange={(e) =>
                setForm((prev) => ({
                  ...prev,
                  sortOrder: parseInt(e.target.value) || 0,
                }))
              }
            />

            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-foreground">
                Active
              </label>
              <button
                type="button"
                onClick={() =>
                  setForm((prev) => ({ ...prev, isActive: !prev.isActive }))
                }
                className={`
                  relative inline-flex h-10 w-[72px] items-center rounded-lg border transition-all cursor-pointer
                  ${
                    form.isActive
                      ? "bg-success/15 border-success/30"
                      : "bg-surface border-card-border"
                  }
                `}
              >
                <span
                  className={`
                    inline-block h-6 w-6 rounded-md shadow-sm transition-all duration-200
                    ${
                      form.isActive
                        ? "translate-x-10 bg-success"
                        : "translate-x-2 bg-muted-foreground"
                    }
                  `}
                />
              </button>
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <Button
              variant="secondary"
              size="sm"
              onClick={() => setIsModalOpen(false)}
            >
              Cancel
            </Button>
            <Button size="sm" onClick={handleSave}>
              {editingSection ? "Save Changes" : "Add Section"}
            </Button>
          </div>
        </div>
      </Modal>

      {/* Delete confirmation */}
      <ConfirmDialog
        isOpen={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        onConfirm={() => deleteTarget && handleDelete(deleteTarget)}
        title="Delete Section"
        message={`Are you sure you want to delete "${deleteTarget?.sectionName}"? This action cannot be undone.`}
      />
    </div>
  );
}
