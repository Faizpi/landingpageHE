# Hibiscus Efsya Landing Design Contract

## 1. Direction

The landing page must feel direct, capable, and approachable. Hibiscus red is the only primary accent. The visual system favors strong typography, real CMS imagery, calm surfaces, and clear conversion paths over gradient text, decorative glass, repeated glow, or motion-heavy effects.

## 2. Themes and Color Roles

Both light and dark themes are supported.

- Light is the primary brand presentation: neutral bright canvas, dark high-contrast text, restrained red accents.
- Dark is a deliberate companion: near-black brand-tinted canvas, readable text, subtle borders, and no excessive red glow.
- User-facing theme options are only Light and Dark.
- On the first visit, theme initialization may follow `prefers-color-scheme`; after an explicit selection, persist only `light` or `dark`.
- Body text must meet WCAG AA 4.5:1 contrast. Large text must meet 3:1.

## 3. Typography and Content

- One page-level `h1`; section titles use `h2`, item titles use `h3`.
- Display headings use balanced wrapping and never exceed 6rem.
- Body copy is capped at 65–75 characters per line and uses comfortable line-height.
- CMS content remains authoritative. Interface chrome may be translated, but CMS prose must not pretend to be translated when localized fields do not exist.
- Avoid repeated uppercase eyebrows, generic “signature” labels, and unsupported marketing claims.

## 4. Layout and Responsive Rules

- Use a centered content width equivalent to the existing `max-w-7xl` convention.
- Section rhythm varies intentionally; primary narrative blocks receive more whitespace than supporting evidence.
- The navbar is a floating capsule on desktop and a compact capsule trigger on mobile.
- Mobile, tablet, and desktop layouts must tolerate long Indonesian/English labels and long CMS content without clipping.
- Full-height mobile surfaces use dynamic viewport units where applicable.
- Native scrolling stays discoverable; do not hide scrollbars globally.

## 5. Reusable Primitives

### Capsule navbar

- Solid or nearly solid surface, one subtle border, restrained shadow.
- Desktop: brand, anchor navigation, direct `ID/EN`, direct theme toggle, primary contact CTA when space allows.
- Mobile: brand and menu trigger in capsule; panel exposes navigation, language, theme, and CTA without a settings popover.
- States: default, hover, active/current, focus-visible, expanded, pressed.

### Buttons and links

- One dominant primary CTA per decision area.
- Secondary action is lower emphasis: outline, quiet button, or text link.
- Minimum interactive target: 44×44 CSS pixels.
- Dead links and `href="#"` fallbacks are prohibited.

### Content surfaces

- Prefer spacing, tonal shifts, and borders over generic card elevation.
- Cards are used only when grouping or action hierarchy requires them.
- Glassmorphism and repeated glow are prohibited as defaults.

### Forms

- Persistent labels, required semantics, browser autocomplete, inline errors.
- Errors use `aria-invalid` and `aria-describedby`.
- Submission exposes processing, success, validation failure, and server/network failure states.
- Failed submission preserves user input and offers the best available CMS contact channel.

### Service navigation

- Category state must be keyboard operable and communicated independently of color.
- Narrow screens use reachable horizontal navigation or a quiet wrapping pattern without overflow.
- Coming-soon items are visibly non-actionable.

## 6. Motion

- Core content is visible by default, before JavaScript or Intersection Observer activation.
- Motion is progressive enhancement and must serve hierarchy or interaction.
- One restrained hero entrance is allowed; repetitive reveal animation across every section is not.
- Remove scroll velocity rotation, decorative parallax, orbital motion, and arbitrary 3D card transforms.
- `prefers-reduced-motion` shows content immediately and disables nonessential movement.
- Animate only compositor-friendly properties such as transform and opacity.

## 7. Imagery and Performance

- Preserve CMS-provided imagery and use it as meaningful brand evidence.
- Hero imagery receives stable dimensions/aspect ratio and appropriate high priority.
- Below-fold imagery is lazy-loaded and decoded asynchronously where appropriate.
- Meaningful images have descriptive alt text; decorative images use empty alt.
- Empty image fields must not produce broken placeholders or structural gaps.

## 8. Accessibility

- Semantic landmarks and heading order are mandatory.
- All icon-only controls have localized accessible labels.
- Mobile navigation uses `aria-expanded`, `aria-controls`, Escape handling, and focus restoration.
- Toggle controls expose state with `aria-pressed`.
- Visible focus treatment works in both themes.
- Status messages use suitable live-region semantics.
- Color is never the only indicator of selection, status, or error.

## 9. Prohibited Patterns

- Gradient text.
- Repeated glowing or glass cards.
- Repeated tiny uppercase section eyebrows.
- Hero metric-card template as the primary composition.
- Visible System theme choice.
- Oversized settings popover for language/theme controls.
- Scroll-velocity/parallax decoration and arbitrary 3D rotation.
- Content initialized with `opacity: 0` when it is required to understand or operate the page.
- Index-based React keys for mutable CMS lists when stable identifiers exist.
