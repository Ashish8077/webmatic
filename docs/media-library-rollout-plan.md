# Roll Out Media Library Across About Us & Services CMS

This plan details the implementation strategy to propagate the generic Media Library architecture across all remaining Homepage, About Us, and Services sections, while preserving a clear separation of concerns between the CMS editing pipeline, backend API, and public frontend rendering pipeline.

## Implementation Rules

- Do NOT modify the backend.
- Do NOT modify database migrations.
- Do NOT change API contracts.
- Do NOT create new image picker components.
- Do NOT duplicate Media Library logic.
- Reuse the existing `MediaBrowser`, `MediaPickerModal`, `MediaField`, `MediaPickerField`, and `VisualPickerField`.
- Preserve backward compatibility with existing CMS content.
- Preserve existing UI/UX, styling, spacing, animations, and responsiveness.
- Treat the backend as the source of truth.

## User Review Required

> [!IMPORTANT]
> Please review the refined implementation plan. It incorporates the required media audit, field-level inventory, strict implementation boundaries, media relationship validation, frontend acceptance criteria, regression testing, and final deliverables.
>
> `hydrateMediaRelations()` must remain restricted solely to CMS forms that actually contain media fields. Public frontend mappers must only consume pre-hydrated API payloads and map them into UI types.

## Architecture Boundaries

CMS Editing Pipeline:

```text
Backend API
  -> Section Normalizer
  -> hydrateMediaRelations()
  -> React Hook Form
  -> MediaPickerField / VisualPickerField
  -> MediaField
  -> MediaPickerModal
  -> MediaBrowser
```

Public Frontend Rendering Pipeline:

```text
Backend API
  -> Repository
  -> Mapper
  -> UI Types
  -> getMediaUrl()
  -> Next.js Components
```

## Proposed Changes

### Step 0 - Media Audit

Before modifying any code, all CMS schemas and frontend sections must be audited to identify where image fields exist and their current implementation status.

| Section | Image Field | Current Component | CMS Hydrated? | Frontend Rendered? |
| :--- | :--- | :--- | :---: | :---: |
| Hero | `backgroundImageId` | `MediaPickerField` | Yes | Yes |
| Testimonials | `backgroundImageId` | `MediaPickerField` | Yes | Yes |
| Why Choose Us | `imageId` | `VisualPickerField` | Yes | Yes |
| About Hero | `imageId` | `MediaPickerField` | No | No |
| About | `imageId` on cards | `MediaPickerField` | No | No |
| Company Statistics | `imageId` | `VisualPickerField` | No | No |
| Core Values | `imageId` | `VisualPickerField` | No | No |
| Development Process | `imageId` on repeater items | `MediaPickerField` | No | No |
| Services Hero | `imageId` | `MediaPickerField` | No | No |
| Team Members | `imageId` | `VisualPickerField` | No | No |

The following schemas were audited and confirmed to contain no image fields: `Company Overview`, `Contact CTA`, `FAQ`, `Mission & Vision`, and `Services Listing`. Leave them untouched to avoid unnecessary processing.

### Step 0.1 - Media Field Inventory

Every individual media-bearing field must be inventoried before implementation. This table is the implementation checklist.

| Section | Field | Type | Component |
| :--- | :--- | :--- | :--- |
| Hero | `backgroundImageId` | Media | `MediaPickerField` |
| Testimonials | `backgroundImageId` | Media | `MediaPickerField` |
| Why Choose Us | `imageId` | VisualAsset | `VisualPickerField` |
| About Hero | `imageId` | Media | `MediaPickerField` |
| About Card | `imageId` | Media | `MediaPickerField` |
| Company Statistic | `imageId` | VisualAsset | `VisualPickerField` |
| Core Value | `imageId` | VisualAsset | `VisualPickerField` |
| Development Step | `imageId` | Media | `MediaPickerField` |
| Services Hero | `imageId` | Media | `MediaPickerField` |
| Team Member | `imageId` | VisualAsset | `VisualPickerField` |

If additional image fields are discovered during implementation, add them to this inventory before modifying code.

### Step 1 - Refactor Picker Fields to React Hook Form `useWatch` Pattern

The core picker components will be refactored to use `useWatch` plus `setValue` as their single source of truth, enforcing strict React Hook Form state management.

Modify:

- `src/features/page-sections/components/fields/media-picker-field.tsx`
- `src/features/page-sections/components/fields/visual-picker-field.tsx`

Requirements:

- Refactor `MediaPickerField` to use `useWatch({ name: imageKey })` for reading the media object.
- Refactor `VisualPickerField` to use the same pattern.
- Update `handleMediaChange` to call `setValue(imageKey, newMedia)`.
- Update the ID field through `fieldProps.onChange(newMedia?.id ?? null)`.
- Do not introduce a second source of truth for selected media.
- Do not change picker UI, styling, spacing, animations, or responsiveness.

### Step 2 - Standardize Section Hydration in CMS Forms

For every form identified in the audit as having an image field, wrap the `parse...Defaults` return values in:

```ts
hydrateMediaRelations((content ?? {}) as JsonObject, parsed)
```

This ensures existing images preload correctly in CMS edit views.

Files to update:

- `src/features/page-sections/components/forms/about-hero-form.tsx`
- `src/features/page-sections/components/forms/about-form.tsx`
- `src/features/page-sections/components/forms/company-statistics-form.tsx`
- `src/features/page-sections/components/forms/core-values-form.tsx`
- `src/features/page-sections/components/forms/development-process-form.tsx`
- `src/features/page-sections/components/forms/services-hero-form.tsx`
- `src/features/page-sections/components/forms/team-members-form.tsx`

Rules:

- Add CMS hydration only to forms that contain media fields.
- Do not add `hydrateMediaRelations()` to frontend mappers.
- Do not add backend hydration logic.
- Preserve existing CMS content shape and defaults.

### Step 3 - Frontend Section Normalizers

The public frontend API already provides hydrated media objects globally. Frontend mappers must only expose the `.image` and `.backgroundImage` objects from the API payload into UI types.

Files to update:

- `src/components/home/sections/about-section/mapper.ts`
- `src/components/sections/about-hero/mapper.ts`
- `src/components/sections/company-statistics/mapper.ts`
- `src/components/sections/core-values/mapper.ts`
- `src/components/sections/development-process/mapper.ts`
- `src/components/sections/services-hero/mapper.ts`
- `src/components/sections/team-members/mapper.ts`

Rules:

- Do not call `hydrateMediaRelations()` from these mappers.
- Do not change API payload contracts.
- Do not require frontend components to infer database relationships.
- Preserve existing fallback values and defensive defaults.

### Step 4 - Frontend Rendering Components

All frontend components identified in the audit will dynamically render uploaded images through `getMediaUrl(media)`. Existing fallbacks must remain in place to ensure layout stability when an image is missing, deleted, or not yet configured.

Files to update:

- `src/components/home/sections/about-section/about-section.tsx`
- `src/components/sections/about-hero/about-hero-section.tsx`
- `src/components/sections/company-statistics/company-statistics-section.tsx`
- `src/components/sections/core-values/core-values-section.tsx`
- `src/components/sections/development-process/development-process-section.tsx`
- `src/components/sections/services-hero/services-hero-section.tsx`
- `src/components/sections/team-members/team-members-section.tsx`

## Frontend Acceptance Criteria

Every updated frontend section must:

- Render the uploaded image.
- Render the existing fallback when no image is supplied.
- Never break layout.
- Never stretch the image.
- Preserve aspect ratio.
- Preserve existing `object-fit` behavior.
- Preserve responsive layout.
- Produce no Cumulative Layout Shift.
- Produce no hydration mismatch.
- Produce no console errors.

## Media Relationship Validation

After saving each updated section, verify the full relationship chain:

```text
Media Object
  -> Media ID
  -> Database
  -> API
  -> Frontend
  -> Same Image
```

The image selected in the CMS must be the exact same image rendered on the public website after a full page refresh.

Validation requirements:

- Select or replace an image in the CMS.
- Save the section.
- Refresh the CMS edit view and confirm the selected image preloads.
- Refresh the public page.
- Confirm the rendered image URL resolves to the same media item selected in the CMS.
- Repeat for repeater/list fields such as About cards, Development Process steps, Core Values, and Team Members.

## Verification Plan

### CMS Verification

For every updated image field, verify:

- Existing image preloads correctly on edit.
- The same Media Picker and Media Browser are reused.
- Upload, Replace, and Remove work without errors.
- Save persists the change using only the media ID.
- Form dirty and touched state is preserved properly.
- Validation works correctly.
- Legacy content without media objects still loads safely.

### Public Frontend Verification

For every updated frontend section, verify:

- Uploaded images render through `getMediaUrl()`.
- Existing static fallbacks render when no media is supplied.
- Deleted or unavailable media is handled gracefully.
- Layout remains stable across desktop, tablet, and mobile.
- There are no console errors.
- There are no hydration mismatches.
- There is no Cumulative Layout Shift introduced by the image change.

### Regression Testing

Verify that existing working implementations continue to function:

- Homepage Hero
- Homepage Testimonials
- Homepage Why Choose Us
- Service Listing

No regressions are allowed while implementing the remaining sections. These sections should remain untouched unless a directly related compatibility fix is required.

### Automated Tests

Run:

```bash
npm run type-check
npm run lint
```

Requirements:

- TypeScript must pass without introducing `any`.
- Lint must pass.
- Existing tests must continue to pass if the project has a test command.

## Deliverables

Provide a final implementation summary including:

- Sections updated.
- Forms updated.
- Picker components updated.
- Frontend mappers updated.
- Frontend renderers updated.
- Media fields migrated.
- Legacy `ImagePicker` usages removed, if any.
- Remaining sections, if any.
- Verification results.

## Final Implementation Standard

The implementation is complete only when:

- All fields in the Media Field Inventory are handled.
- The CMS edit pipeline preloads, saves, replaces, and removes media correctly.
- The public frontend renders the same selected media after a full refresh.
- Existing fallbacks continue to work.
- Existing working media sections remain functional.
- No backend, migration, or API contract changes are introduced.
- The final deliverables are reported clearly for code review.
