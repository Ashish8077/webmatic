"use client";

import { useState, useEffect } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Loader2 } from "lucide-react";
import { Modal } from "@/components/ui/modal";
import { Button } from "@/components/ui/button";
import { showToast } from "@/components/ui/toast";
import type { JsonObject } from "@/shared/types/json";
import type { PageSectionType } from "@/modules/pages-section/validation/page-section.schema";
import {
  SECTION_CONTENT_SCHEMA_MAP,
  SECTION_SETTINGS_SCHEMA_MAP,
  SECTION_CONTENT_FORM_MAP,
  SECTION_SETTINGS_FORM_MAP,
  SECTION_CONTENT_DEFAULTS_MAP,
  SECTION_SETTINGS_DEFAULTS_MAP,
} from "../constants/section-form-registry";

const FORM_ID = "section-editor-form";



interface SectionContentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (values: {
    content: JsonObject;
    settings: JsonObject;
  }) => Promise<void>;
  sectionType: PageSectionType | null;
  content: JsonObject;
  settings?: JsonObject | null;
  isSubmitting: boolean;
  isLoading?: boolean;
}

export function SectionContentModal(props: SectionContentModalProps) {
  const { isOpen, onClose, sectionType, isLoading } = props;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={sectionType ? `Edit ${sectionType}` : "Edit Section"}
      size="lg"
      footer={
        <div className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-end sm:gap-3">
          <Button
            type="button"
            variant="secondary"
            size="sm"
            className="w-full sm:w-auto"
            disabled={props.isSubmitting || isLoading}
            onClick={onClose}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            form={FORM_ID}
            size="sm"
            className="w-full sm:w-auto"
            disabled={isLoading || !sectionType}
            isLoading={props.isSubmitting}
          >
            Save Changes
          </Button>
        </div>
      }
    >
      {isLoading ? (
        <div className="flex min-h-[300px] flex-col items-center justify-center">
          <Loader2 className="h-7 w-7 animate-spin text-accent" />
          <p className="mt-3 text-sm text-muted-foreground">
            Loading section...
          </p>
        </div>
      ) : sectionType ? (
        <SectionEditorInner key={sectionType} {...props} sectionType={sectionType} />
      ) : (
        <div className="flex min-h-[200px] flex-col items-center justify-center">
          <p className="text-sm text-muted-foreground">
            Select a section...
          </p>
        </div>
      )}
    </Modal>
  );
}

// Inner component ensures hooks only run when we have a valid sectionType
function SectionEditorInner({
  sectionType,
  content,
  settings,
  onSubmit,
  isSubmitting,
}: SectionContentModalProps & { sectionType: PageSectionType }) {
  const [activeTab, setActiveTab] = useState<"content" | "settings">("content");

  const ContentForm = SECTION_CONTENT_FORM_MAP[sectionType];
  const SettingsForm = SECTION_SETTINGS_FORM_MAP[sectionType];

  const contentSchema = SECTION_CONTENT_SCHEMA_MAP[sectionType];
  const settingsSchema = SECTION_SETTINGS_SCHEMA_MAP[sectionType];

  const parseContent = SECTION_CONTENT_DEFAULTS_MAP[sectionType];
  const parseSettings = SECTION_SETTINGS_DEFAULTS_MAP[sectionType];

  const combinedSchema = z.object({
    content: contentSchema,
    settings: settingsSchema,
  });

  const form = useForm({
    resolver: zodResolver(combinedSchema),
    defaultValues: {
      content: parseContent(content),
      settings: parseSettings(settings),
    },
  });
  
  // Re-parse when content/settings props change (e.g., editing a different section of same type)
  useEffect(() => {
    form.reset({
      content: parseContent(content),
      settings: parseSettings(settings),
    });
  }, [content, settings, parseContent, parseSettings, form]);

  const handleSubmit = form.handleSubmit(
    (values) => {
      return onSubmit({
        content: values.content as JsonObject,
        settings: values.settings as JsonObject,
      });
    },
    (errors) => {
      console.error("Form Validation Errors:", errors);
      showToast("Please check the form for missing or invalid fields.", "error");
    }
  );

  if (!ContentForm || !SettingsForm) {
    return (
      <div className="flex min-h-[200px] flex-col items-center justify-center">
        <p className="text-sm text-muted-foreground">
          Form not available for {sectionType}.
        </p>
      </div>
    );
  }

  const hasSettings =
    settingsSchema instanceof z.ZodObject &&
    Object.keys(settingsSchema.shape).length > 0;

  return (
    <FormProvider {...form}>
      <form id={FORM_ID} onSubmit={handleSubmit} className="space-y-4">
        {hasSettings && (
          <div className="mb-4 flex items-center gap-2 border-b">
            <button
              type="button"
              className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
                activeTab === "content"
                  ? "border-accent text-accent"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              }`}
              onClick={() => setActiveTab("content")}
            >
              Content
            </button>
            <button
              type="button"
              className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
                activeTab === "settings"
                  ? "border-accent text-accent"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              }`}
              onClick={() => setActiveTab("settings")}
            >
              Settings
            </button>
          </div>
        )}

        <div className={activeTab === "content" || !hasSettings ? "block" : "hidden"}>
          <ContentForm disabled={isSubmitting} />
        </div>

        {hasSettings && (
          <div className={activeTab === "settings" ? "block" : "hidden"}>
            <SettingsForm disabled={isSubmitting} />
          </div>
        )}
      </form>
    </FormProvider>
  );
}
