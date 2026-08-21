# Design System

Version: 1.0
Status: Approved
Last Updated: 2026-07-22
Owner: Frontend Team

---

# 1. Containers

Default Container
max-width: 1170px

Horizontal Padding
Mobile: px-5
Tablet/Desktop: sm:px-8

# 2. Responsive Breakpoints

Mobile
0 - 639px

Tablet
640px - 1023px

Desktop
1024px+

Large Desktop
1280px+

# 3. Grid System

Standard Grid

1 Column
Mobile

2 Columns
Tablet

3 Columns
Desktop

4 Columns
Large Desktop (when appropriate)

# 4. Spacing Scale

XS
gap-2

SM
gap-4

MD
gap-6

LG
gap-8

XL
gap-10

# 5. Section Spacing

Small Section
py-16

Use when:
- Simple blocks like CTA or FAQ
- Footer extensions

---

Medium Section
py-20

Use when:
- Standard marketing sections
- Feature grids
- Content + image layouts
- Testimonial sections
- Service listing sections

---

Large Section
py-24

Use when:
- Extensive editorial content
- Premium feature showcases
- Sections requiring high visual breathing room

---

Standard Hero Banner
py-28

Use when:
- Internal page headers (e.g., About Us)

---

Fullscreen Hero
height: calc(100vh - 104px)

Use when:
- Primary landing page (e.g., Homepage)

# 6. Typography

Hero Title
48px
font-bold
leading-[1.15]
text-navy

---

Large Feature Title
40px
font-bold
leading-[1.15]
text-navy

---

Section Title
36px
font-bold
leading-[1.15]
text-navy

---

Section Badge
12px
uppercase
tracking-[0.2em]
font-bold
text-orange-500

---

Body
16px
leading-[1.7]
text-slate-500

---

Caption
14px
text-slate-500

# 7. Colors

Primary
#0A98D4

---

Navy
#081A4B

---

Orange
#F97316

---

Background
White

---

Alternate Background
Slate-50

# 8. Background Strategy

White
Primary content sections

---

Slate-50
Alternate sections to create visual separation

---

Primary
CTA backgrounds only

---

Avoid placing two Slate-50 sections consecutively unless intentionally required.
This prevents inconsistent section transitions.

# 9. Buttons

Primary Button
rounded-xl
px-6
py-3
font-semibold
shadow-lg
hover lift
bg-primary
text-white

---

Hero Button
rounded-full
px-9
py-4
font-semibold
shadow-lg
hover lift
bg-primary
text-white

# 10. Cards

Card Small
p-6
rounded-2xl
border
shadow

---

Card Medium
p-8
rounded-2xl
border
shadow

---

Card Large
p-10
rounded-3xl
border
shadow

# 11. Images

Corner Radius
rounded-2xl

Object Fit
object-cover

Loading
Next.js Image

Hero
priority

Content Images
lazy

# 12. Border Radius

Small
rounded-lg

---

Medium
rounded-xl

---

Large
rounded-3xl

# 13. Shadows

Small
Card Base (shadow-sm)

---

Medium
Hero Overlays / Inner Elements

---

Large
Hover States (shadow-lg)

# 14. Icons

Library
Lucide React

---

Size
20 (w-5 h-5)
24 (w-6 h-6)
28 (w-7 h-7)

---

Style
Outline (strokeWidth={1.5})

# 15. Motion

Duration
200ms

Standard Hover
hover:-translate-y-0.5

Large Hover
hover:-translate-y-1

Transition
transition-all ease-out

# 16. Accessibility

- Maintain a logical heading hierarchy appropriate to the page structure. Use h1 once per page, followed by nested h2, h3, etc., where semantically appropriate.
- Visible focus state
- Keyboard navigation support
- Minimum contrast compliance
- Alt text for all images
- Semantic HTML (proper section, nav, article, main tags)

# 17. Component Rules

- Reuse shared components.
- Never duplicate Button styles.
- Never duplicate Badge styles.
- Never duplicate Container styles.
- Never introduce a new shadow without updating the design system.
- Never introduce a new spacing value unless strictly required.

# 18. Design Principles

Consistency
Reuse existing patterns before creating new ones.

Hierarchy
Typography and spacing should clearly communicate importance.

Simplicity
Avoid unnecessary visual complexity.

Accessibility
Every component must remain usable with keyboard and screen readers.

Responsiveness
Every component must work on Mobile, Tablet, and Desktop.

Performance
Prefer reusable components and avoid unnecessary DOM complexity.

# 19. Design Rules (Do Not)

Do NOT
- Introduce new colors without updating the design system.
- Introduce new font sizes unless absolutely necessary.
- Introduce new spacing values unless justified.
- Duplicate existing UI components.
- Create page-specific button styles.
- Create page-specific badge styles.
- Create page-specific shadows.
- Hardcode styling that already exists in shared components.
- Mix different border radius styles within the same component.

# 20. Layout Rules

- All sections must use the shared Container.
- Do not exceed the maximum content width.
- Align content consistently within the grid.
- Maintain consistent spacing between headings and content.
- Avoid deeply nested layout wrappers unless necessary.
- Prefer CSS Grid for section layouts and Flexbox for component layouts.

# 21. Forms

Inputs
- rounded-xl
- consistent height
- visible focus state

Labels
- above inputs
- medium font weight

Validation
- consistent error styling
- consistent helper text

Buttons
- use Primary Button

Spacing
- use MD or LG spacing between fields

# 22. States

Loading
- Skeletons preferred
- Avoid layout shifts

Empty
- Friendly illustration or icon
- Clear explanation
- Primary CTA if applicable

Error
- Consistent error card
- Retry action
- Accessible messaging

# 23. Design System Changes

Before introducing any new:
- Color
- Typography scale
- Shadow
- Border radius
- Button variant
- Card variant
- Spacing value

Ask:
1. Can an existing pattern be reused?
2. Does this solve a real design problem?
3. Will it be reused elsewhere?

If the answer is "no", do not add it.

If a new pattern is approved:
1. Update the Design System.
2. Update shared UI components.
3. Then use it in feature pages.

Never implement a new design pattern first and document it later.
