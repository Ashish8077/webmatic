"use client";

import { useFormContext, useFieldArray } from "react-hook-form";
import { HeaderSettings } from "@/modules/site-settings/types/header.types";
import { Input } from "@/components/ui/input";
import { MediaField } from "@/features/media/components/media-field/media-field";
import { ReferenceTargetSelector } from "@/features/menus/components/reference-target-selector";
import { Button } from "@/components/ui/button";
import { Trash2, Plus, GripVertical } from "lucide-react";

export function HeaderSettingsForm({ disabled }: { disabled?: boolean }) {
  const { register, control, watch, setValue, formState: { errors } } = useFormContext<HeaderSettings>();

  const logoImage = watch("logo.image");
  const ctaDestType = watch("cta.destinationType");
  const ctaRefId = watch("cta.referenceId");

  const { fields: socialFields, append: appendSocial, remove: removeSocial } = useFieldArray({
    control,
    name: "socialLinks",
  });

  return (
    <div className="space-y-8">
      {/* Visibility Toggles */}
      <section className="bg-card rounded-lg border shadow-sm p-6 space-y-6">
        <h3 className="text-base font-medium border-b pb-2">Visibility Controls</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <label className="flex items-center gap-2">
            <input type="checkbox" {...register("visibility.topBar")} disabled={disabled} className="rounded border-gray-300 text-primary focus:ring-primary" />
            <span className="text-sm font-medium">Top Bar</span>
          </label>
          <label className="flex items-center gap-2">
            <input type="checkbox" {...register("visibility.phone")} disabled={disabled} className="rounded border-gray-300 text-primary focus:ring-primary" />
            <span className="text-sm font-medium">Phone</span>
          </label>
          <label className="flex items-center gap-2">
            <input type="checkbox" {...register("visibility.email")} disabled={disabled} className="rounded border-gray-300 text-primary focus:ring-primary" />
            <span className="text-sm font-medium">Email</span>
          </label>
          <label className="flex items-center gap-2">
            <input type="checkbox" {...register("visibility.social")} disabled={disabled} className="rounded border-gray-300 text-primary focus:ring-primary" />
            <span className="text-sm font-medium">Social Links</span>
          </label>
        </div>
      </section>

      {/* Logo Settings */}
      <section className="bg-card rounded-lg border shadow-sm p-6 space-y-6">
        <h3 className="text-base font-medium border-b pb-2">Site Logo</h3>
        <div className="grid gap-6">
          <div className="space-y-2">
            <MediaField
              label="Logo Image"
              value={logoImage || null}
              onMediaChange={(media) => {
                setValue("logo.image", media, { shouldDirty: true });
                setValue("logo.imageId", media?.id || null, { shouldDirty: true });
              }}
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Alt Text</label>
            <Input {...register("logo.altText")} placeholder="Webmatic Technology" disabled={disabled} />
          </div>
        </div>
      </section>

      {/* Contact Info */}
      <section className="bg-card rounded-lg border shadow-sm p-6 space-y-6">
        <h3 className="text-base font-medium border-b pb-2">Contact Information</h3>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Phone</h4>
            <div className="space-y-2">
              <label className="text-sm font-medium">Display Number *</label>
              <Input {...register("contactInfo.phone.number")} placeholder="+91-9289351703" disabled={disabled} />
              {errors.contactInfo?.phone?.number && <p className="text-xs text-danger">{errors.contactInfo.phone.number.message}</p>}
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Phone URL (optional)</label>
              <Input {...register("contactInfo.phone.url")} placeholder="tel:+919289351703" disabled={disabled} />
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Email</h4>
            <div className="space-y-2">
              <label className="text-sm font-medium">Display Address *</label>
              <Input {...register("contactInfo.email.address")} placeholder="info@webmatictechnology.com" disabled={disabled} />
              {errors.contactInfo?.email?.address && <p className="text-xs text-danger">{errors.contactInfo.email.address.message}</p>}
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Email URL (optional)</label>
              <Input {...register("contactInfo.email.url")} placeholder="mailto:info@webmatictechnology.com" disabled={disabled} />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Button */}
      <section className="bg-card rounded-lg border shadow-sm p-6 space-y-6">
        <h3 className="text-base font-medium border-b pb-2">Call to Action (CTA) Button</h3>
        <div className="grid gap-6 md:grid-cols-2">
          <div className="space-y-2">
            <label className="text-sm font-medium">Button Text *</label>
            <Input {...register("cta.label")} placeholder="Get in Touch" disabled={disabled} />
            {errors.cta?.label && <p className="text-xs text-danger">{errors.cta.label.message}</p>}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Destination Type</label>
            <select
              {...register("cta.destinationType")}
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary disabled:cursor-not-allowed disabled:opacity-50"
              disabled={disabled}
            >
              <option value="page">Internal Page</option>
              <option value="service">Service Page</option>
              <option value="external">External URL</option>
              <option value="none">None (Hidden)</option>
            </select>
          </div>

          {(ctaDestType === "page" || ctaDestType === "service") && (
            <div className="space-y-2 md:col-span-2 max-w-md">
              <label className="text-sm font-medium">Select {ctaDestType === "page" ? "Page" : "Service"} *</label>
              <ReferenceTargetSelector
                type={ctaDestType}
                value={ctaRefId || null}
                onChange={(val) => setValue("cta.referenceId", val, { shouldDirty: true, shouldValidate: true })}
                disabled={disabled}
                error={errors.cta?.referenceId?.message}
              />
            </div>
          )}

          {ctaDestType === "external" && (
            <div className="space-y-2 md:col-span-2">
              <label className="text-sm font-medium">External URL *</label>
              <Input {...register("cta.url")} placeholder="https://..." disabled={disabled} />
              {errors.cta?.url && <p className="text-xs text-danger">{errors.cta.url.message}</p>}
            </div>
          )}
        </div>
      </section>

      {/* Social Links */}
      <section className="bg-card rounded-lg border shadow-sm p-6 space-y-6">
        <div className="flex items-center justify-between border-b pb-2">
          <h3 className="text-base font-medium">Social Links</h3>
          <Button
            type="button"
            variant="secondary"
            size="sm"
            onClick={() => appendSocial({ platform: "facebook", url: "", enabled: true })}
            disabled={disabled}
          >
            <Plus className="mr-2 h-4 w-4" /> Add Social
          </Button>
        </div>
        
        <div className="space-y-4">
          {socialFields.map((field, index) => (
            <div key={field.id} className="flex items-start gap-4 p-4 border rounded-lg bg-muted/20 relative group">
              <div className="pt-2 cursor-grab opacity-50 hover:opacity-100">
                <GripVertical size={16} />
              </div>
              
              <div className="flex-1 grid grid-cols-1 md:grid-cols-12 gap-4">
                <div className="md:col-span-3 space-y-2">
                  <label className="text-xs font-medium">Platform</label>
                  <select
                    {...register(`socialLinks.${index}.platform`)}
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                    disabled={disabled}
                  >
                    <option value="facebook">Facebook</option>
                    <option value="twitter">Twitter / X</option>
                    <option value="instagram">Instagram</option>
                    <option value="linkedin">LinkedIn</option>
                    <option value="youtube">YouTube</option>
                  </select>
                </div>
                
                <div className="md:col-span-7 space-y-2">
                  <label className="text-xs font-medium">URL</label>
                  <Input {...register(`socialLinks.${index}.url`)} placeholder="https://..." disabled={disabled} />
                  {errors.socialLinks?.[index]?.url && <p className="text-xs text-danger">{errors.socialLinks[index]?.url?.message}</p>}
                </div>
                
                <div className="md:col-span-2 space-y-2 flex flex-col items-start justify-center pt-6">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" {...register(`socialLinks.${index}.enabled`)} disabled={disabled} className="rounded border-gray-300 text-primary" />
                    <span className="text-sm">Enabled</span>
                  </label>
                </div>
              </div>

              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="text-muted-foreground hover:text-danger hover:bg-danger/10 absolute right-2 top-2 opacity-0 group-hover:opacity-100 transition-opacity p-2"
                onClick={() => removeSocial(index)}
                disabled={disabled}
              >
                <Trash2 size={16} />
              </Button>
            </div>
          ))}
          
          {socialFields.length === 0 && (
            <p className="text-sm text-muted-foreground text-center py-4">No social links configured.</p>
          )}
        </div>
      </section>
    </div>
  );
}
