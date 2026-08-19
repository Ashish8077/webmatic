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
