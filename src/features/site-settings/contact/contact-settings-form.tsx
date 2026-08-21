"use client";

import { TextField, TextareaField } from "@/features/page-sections/components/fields";

export function ContactSettingsForm({ disabled }: { disabled?: boolean }) {
  return (
    <div className="space-y-8">
      {/* Form Settings */}
      <div className="bg-card rounded-lg border shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b bg-muted/30">
          <h3 className="text-lg font-medium">Form Settings</h3>
          <p className="text-sm text-muted-foreground">Manage the global contact form responses and behavior.</p>
        </div>
        <div className="p-6 space-y-6">
          <TextareaField
            name="form.privacyNote"
            label="Privacy Note"
            placeholder="e.g. Note: Your details are kept strictly confidential..."
            disabled={disabled}
          />
          <p className="text-[13px] text-muted-foreground -mt-4">
            This note appears below the contact form to reassure users about their data privacy.
          </p>

          <TextField
            name="form.successMessage"
            label="Success Message"
            placeholder="e.g. Thank you for getting in touch!"
            disabled={disabled}
          />
          <p className="text-[13px] text-muted-foreground -mt-4">
            The message displayed to the user after successfully submitting the form.
          </p>

          <TextField
            name="form.redirectUrl"
            label="Redirect URL (Optional)"
            placeholder="e.g. /thank-you"
            disabled={disabled}
          />
          <p className="text-[13px] text-muted-foreground -mt-4">
            If provided, users will be redirected to this URL instead of seeing the success message.
          </p>
        </div>
      </div>

      {/* Page Settings */}
      <div className="bg-card rounded-lg border shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b bg-muted/30">
          <h3 className="text-lg font-medium">Contact Page Settings</h3>
          <p className="text-sm text-muted-foreground">Manage specific settings for the Contact Us page.</p>
        </div>
        <div className="p-6 space-y-6">
          <TextField
            name="page.mapEmbedUrl"
            label="Google Map Embed URL"
            placeholder="e.g. https://www.google.com/maps/embed?..."
            disabled={disabled}
          />
          <p className="text-[13px] text-muted-foreground -mt-4">
            Paste the <code>src</code> URL from the Google Maps iframe embed code.
          </p>
        </div>
      </div>
    </div>
  );
}
