"use client";


import { 
  TextField, 
  TextareaField, 
  SwitchField,
  RepeaterField,
  SelectField
} from "@/features/page-sections/components/fields";

export function FooterSettingsForm({ disabled }: { disabled?: boolean }) {
  return (
    <div className="space-y-6 pb-20">
      
      {/* 1. Trusted Brands */}
      <div className="rounded-xl border bg-card text-card-foreground shadow">
        <div className="flex flex-col space-y-1.5 p-6">
          <h3 className="font-semibold leading-none tracking-tight">1. Trusted Brands</h3>
        </div>
        <div className="p-6 pt-0 space-y-4">
          <SwitchField name="trustedBrands.enabled" label="Enable Trusted Brands Strip" disabled={disabled} />
          <TextField name="trustedBrands.title" label="Title" disabled={disabled} />
          <div className="grid gap-3 sm:grid-cols-2">
            <TextField name="trustedBrands.ctaText" label="CTA Text" disabled={disabled} />
            <TextField name="trustedBrands.ctaUrl" label="CTA URL" disabled={disabled} />
          </div>
          
          <RepeaterField
            name="trustedBrands.brands"
            label="Brands"
            disabled={disabled}
            defaultItem={{
              name: "",
              logoType: "text",
              logoText: "",
              mediaId: null,
              fontWeight: "font-normal",
              fontSize: "text-base",
              tracking: "normal"
            }}
            renderItem={(index) => (
              <div className="space-y-4">
                <TextField name={`trustedBrands.brands.${index}.name`} label="Brand Name" disabled={disabled} />
                <SelectField
                  name={`trustedBrands.brands.${index}.logoType`}
                  label="Logo Type"
                  options={[
                    { label: "Text Only", value: "text" },
                    { label: "Image/Media (Coming soon)", value: "media" }
                  ]}
                  disabled={disabled}
                />
                <TextField name={`trustedBrands.brands.${index}.logoText`} label="Logo Text (if text type)" disabled={disabled} />
                <div className="grid gap-3 sm:grid-cols-3">
                  <TextField name={`trustedBrands.brands.${index}.fontWeight`} label="Tailwind Font Weight (e.g. font-bold)" disabled={disabled} />
                  <TextField name={`trustedBrands.brands.${index}.fontSize`} label="Tailwind Font Size (e.g. text-lg)" disabled={disabled} />
                  <TextField name={`trustedBrands.brands.${index}.tracking`} label="Tailwind Tracking (e.g. tracking-wide)" disabled={disabled} />
                </div>
              </div>
            )}
          />
        </div>
      </div>

      {/* 2. Hero CTA */}
      <div className="rounded-xl border bg-card text-card-foreground shadow">
        <div className="flex flex-col space-y-1.5 p-6">
          <h3 className="font-semibold leading-none tracking-tight">2. Footer Hero CTA</h3>
        </div>
        <div className="p-6 pt-0 space-y-4">
          <div className="grid gap-3 sm:grid-cols-2">
            <TextField name="heroCta.heading" label="Heading" disabled={disabled} />
            <TextField name="heroCta.highlightedText" label="Highlighted Text" disabled={disabled} />
          </div>
          <TextareaField name="heroCta.description" label="Description" disabled={disabled} />
          <div className="grid gap-3 sm:grid-cols-2">
            <TextField name="heroCta.buttonText" label="Button Text" disabled={disabled} />
            <TextField name="heroCta.buttonUrl" label="Button URL" disabled={disabled} />
          </div>
        </div>
      </div>

      {/* 3. Contact Information */}
      <div className="rounded-xl border bg-card text-card-foreground shadow">
        <div className="flex flex-col space-y-1.5 p-6">
          <h3 className="font-semibold leading-none tracking-tight">3. Contact Information</h3>
        </div>
        <div className="p-6 pt-0 space-y-6">
          <div className="space-y-4 border p-4 rounded-md">
            <h4 className="font-semibold text-sm">Phone Section</h4>
            <TextField name="contactInfo.phone.title" label="Title" disabled={disabled} />
            <RepeaterField
              name="contactInfo.phone.phones"
              label="Phone Numbers"
              disabled={disabled}
              defaultItem={{ label: "", number: "" }}
              renderItem={(index) => (
                <div className="grid gap-3 sm:grid-cols-2">
                  <TextField name={`contactInfo.phone.phones.${index}.label`} label="Label (e.g. Toll Free)" disabled={disabled} />
                  <TextField name={`contactInfo.phone.phones.${index}.number`} label="Phone Number" disabled={disabled} />
                </div>
              )}
            />
          </div>

          <div className="space-y-4 border p-4 rounded-md">
            <h4 className="font-semibold text-sm">Email Section</h4>
            <TextField name="contactInfo.email.title" label="Title" disabled={disabled} />
            <div className="grid gap-3 sm:grid-cols-2">
              <TextField name="contactInfo.email.subtitle" label="Subtitle" disabled={disabled} />
              <TextField name="contactInfo.email.email" label="Email Address" type="email" disabled={disabled} />
            </div>
          </div>
        </div>
      </div>

      {/* 4. Social Links */}
      <div className="rounded-xl border bg-card text-card-foreground shadow">
        <div className="flex flex-col space-y-1.5 p-6">
          <h3 className="font-semibold leading-none tracking-tight">4. Social Links</h3>
        </div>
        <div className="p-6 pt-0">
          <RepeaterField
            name="socialLinks"
            label="Social Media Platforms"
            disabled={disabled}
            defaultItem={{ platform: "", url: "", enabled: true }}
            renderItem={(index) => (
              <div className="grid gap-3 sm:grid-cols-[1fr,2fr,auto] items-start">
                <SelectField
                  name={`socialLinks.${index}.platform`}
                  label="Platform"
                  options={[
                    { label: "Facebook", value: "Facebook" },
                    { label: "Instagram", value: "Instagram" },
                    { label: "LinkedIn", value: "LinkedIn" }
                  ]}
                  disabled={disabled}
                />
                <TextField name={`socialLinks.${index}.url`} label="URL" disabled={disabled} />
                <div className="pt-8">
                  <SwitchField name={`socialLinks.${index}.enabled`} label="Enabled" disabled={disabled} />
                </div>
              </div>
            )}
          />
        </div>
      </div>

      {/* 5. Copyright */}
      <div className="rounded-xl border bg-card text-card-foreground shadow">
        <div className="flex flex-col space-y-1.5 p-6">
          <h3 className="font-semibold leading-none tracking-tight">5. Copyright</h3>
        </div>
        <div className="p-6 pt-0 space-y-4">
          <TextField name="copyright.companyName" label="Company Name" disabled={disabled} />
          <SwitchField name="copyright.autoYear" label="Automatically display current year" disabled={disabled} />
        </div>
      </div>
      
    </div>
  );
}
