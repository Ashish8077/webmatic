import type { SectionFieldComponent } from "../../types/section-content.types";
import { TextField, TextareaField, NumberField, SwitchField } from "../fields";

export const BlogListContentForm: SectionFieldComponent = ({ disabled }) => {
  return (
    <div className="space-y-5">
      <TextField
        name="content.heading"
        label="Heading"
        placeholder="Latest Blog Posts"
        disabled={disabled}
      />
      <TextareaField
        name="content.subheading"
        label="Sub-heading"
        placeholder="Check out the resources below..."
        disabled={disabled}
      />
      <NumberField
        name="content.postsPerPage"
        label="Posts Per Page"
        disabled={disabled}
      />
    </div>
  );
};

export const BlogListSettingsForm: SectionFieldComponent = ({ disabled }) => {
  return (
    <div className="space-y-5">
      <SwitchField
        name="settings.isVisible"
        label="Visible"
        description="Toggle section visibility on the page"
        disabled={disabled}
      />
    </div>
  );
};
