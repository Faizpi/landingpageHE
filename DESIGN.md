# Hibiscus Efsya Landing Design Contract

## 1. Direction

The landing page must feel direct, capable, and approachable. Hibiscus red is the only primary accent. The visual system favors strong typography, real CMS imagery, calm surfaces, and clear conversion paths over gradient text, decorative glass, repeated glow, or motion-heavy effects.

### Approved targeted redesign reference

- The approved About/Pilar and Services screenshots, including the pasted Stitch HTML, are the visual reference for this targeted redesign. They guide hierarchy, composition, and responsive intent only. They do not override this contract, CMS copy authority, existing anchors, backend contracts, or localization rules.
- This is an integration into the existing design system, not a replacement. The floating capsule navbar remains unchanged in structure, behavior, anchors, controls, and responsive mode.
- Do not hardcode Stitch copy, fixed list lengths, or visual-only placeholder content. Render CMS-backed content and let the available content determine the visible item count.

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

- Category state must use semantic tabs with the expected keyboard model: Tab enters or leaves the tab list, arrow keys move among tabs, and the active tab exposes its selected state and associated panel.
- Selection must be communicated independently of color, with visible focus in both themes.
- Narrow screens use reachable horizontal navigation or a quiet wrapping pattern without overflow.
- Coming-soon items are visibly non-actionable.

### About/Pilar section

- Preserve the existing About anchor and CMS-authored heading and copy. The approved composition is a compact two-column narrative: image stage paired with the About copy, followed by the ecosystem Pilar features and available stats.
- Image resolution priority is the CMS image first, then `/hibiscusefsya.png` as the fallback. The fallback must preserve the restrained About image treatment defined in Motion and must not create a broken placeholder or empty structural gap.
- Features and stats are dynamic CMS collections. Render every valid item supplied by the CMS, with stable identifiers when available. Never assume or enforce a fixed content count.
- The ecosystem feature area may use cards because each feature is a distinct grouped concept, but it must preserve the calm surface and border rules of this system. Stats remain supporting evidence, not a hero-metric composition.
- Empty state: if features or stats are absent, omit that collection cleanly and let the remaining narrative reflow without placeholder claims, empty wrappers, or unexplained gaps. If both are absent, the two-column About narrative remains complete.
- Long-content state: headings, copy, labels, values, and descriptions wrap without clipping or overlap. The image column must not force prose below a readable width.

### Services section

- Preserve the existing Services anchor, CMS category and service copy, action destinations, availability state, and backend data contract.
- Within each selected category, use an asymmetric hierarchy: one large primary service tile, up to two secondary tiles, then a continuation grid for every remaining item. All four or more services remain visible. No carousel, hidden overflow, arbitrary cap, or fixed content count may remove CMS items.
- Hierarchy follows available ordered CMS content. The first valid item is primary, the next one or two are secondary, and all remaining items continue in the grid. With fewer items, the layout contracts naturally without empty tiles.
- Primary size signals visual priority only. It must not invent claims, reorder content beyond the CMS-provided order, or change service availability and link behavior.
- Empty state: a category with no valid services shows a concise localized empty message in its tab panel, without fabricated Stitch content. If no categories exist, omit the tab interface and show the CMS-appropriate section empty state.
- Long-content state: titles, descriptions, labels, and CTA text wrap within each tile. Tiles expand with content and never rely on equal fixed heights that clip CMS prose.

### Targeted responsive behavior

- Mobile: About becomes one readable column with the image and narrative in source-order context, followed by features and stats. Service tabs remain reachable, the primary and secondary hierarchy becomes a single-column flow, and every continuation item remains visible.
- Tablet: About may use a balanced two-column layout when copy width stays readable. Services preserve a clearly dominant primary tile with secondary items beside or below it, then a two-column continuation grid where space permits.
- Desktop: About uses the compact two-column reference composition. Services use the full asymmetric primary, secondary, and continuation hierarchy within the existing centered width.
- At every breakpoint, preserve anchor targets and account for the unchanged capsule navbar so anchored headings are not obscured.
- Both light and dark themes use the existing tokens and surface rules. The redesign must not introduce a separate Stitch-only palette, typography scale, shadow language, or component system.

## 6. Motion

- Core content is visible by default, before JavaScript or Intersection Observer activation.
- Motion is progressive enhancement and must serve hierarchy or interaction.
- One restrained hero entrance is allowed; repetitive reveal animation across every section is not.
- Remove scroll velocity rotation, decorative parallax, orbital motion, and arbitrary 3D card transforms.
- **Hero brand image:** present the pure `/hibiscusefsya.png` logo directly, without a card, badge, border, halo, specular layer, or glow. A restrained pointer-driven spring tilt and modest depth shadow may reinforce interactivity; reset on pointer leave, never move continuously, and remain static under reduced motion.
- **About brand image:** CMS imagery and the fallback logo share a compact, centered composition at approximately 14rem. Use only an understated full frame and modest static shadow within a restrained stage; no rings, crossing rules, glass, ambient animation, or 3D treatment.
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
