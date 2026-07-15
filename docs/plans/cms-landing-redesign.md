# CMS Landing Redesign Implementation Backlog

## Goal

Redesign the existing Laravel/Inertia landing page into a restrained, conversion-focused interface while preserving CMS ownership of Hero, About, Services, Contact, and Footer content.

## Approved decisions

- Floating capsule navbar.
- Remove the gear/settings popover.
- Expose language and theme controls directly.
- Only Light and Dark are visible; first visit may follow OS preference, then explicit choice persists.
- Keep both light and dark themes.
- Retain Hibiscus red as the only primary accent.
- Reduce gradient text, glass, glow, duplicated cards, parallax, and repetitive reveal motion.
- Do not add runtime dependencies.
- Do not commit unless explicitly requested.
- Browser/server QA is deferred because it was not explicitly requested; static diagnostics, tests, and production build remain required.

## Work plan

### 1. Lock backend and CMS behavior

- Add `tests/Feature/LandingPageTest.php` for the Inertia component and the `hero`, `about`, `categories`, `contact`, and `footer` props.
- Add `tests/Feature/ContactSubmissionTest.php` for route existence, successful persistence, validation, and flash response.
- Register named POST route `contact.submit` if missing.
- Keep the existing controller/model/Filament CMS flow intact.
- Normalize footer social-link data so the model, Filament repeater, seeder, TypeScript contract, and Footer renderer agree.

### 2. Normalize shared frontend state

- Make locale state reactive without full-page reload.
- Persist only validated `id` or `en` values and update `<html lang>`.
- Configure theme initialization from system preference only when no explicit choice exists.
- Persist explicit `light` or `dark` values.
- Remove visible System choice and competing settings implementations.

### 3. Establish visual foundations

- Replace gradient text, generic glass cards, glow utilities, and `luxury-*` effects with semantic light/dark surfaces.
- Preserve the current Tailwind/CSS stack.
- Add visible focus styles, readable secondary text, balanced headings, section scroll margin, reduced motion, and visible native scrolling.
- Keep one restrained elevation treatment for the capsule navbar.

### 4. Rebuild navbar as a capsule

- Desktop: brand, anchor links, direct `ID/EN`, direct Light/Dark control, contact CTA when space permits.
- Mobile: compact capsule with brand and menu trigger; expanded panel exposes links and controls directly.
- Add `aria-expanded`, `aria-controls`, `aria-pressed`, Escape handling, close-on-navigation, body scroll lock, and focus restoration.
- Ensure all controls are at least 44×44 CSS pixels and tolerate long translated labels.

### 5. Refocus Hero and About

- Preserve CMS fields and null behavior.
- Make one primary CTA dominant; use a localized `#contact` fallback only when CMS CTA fields are incomplete.
- Demote secondary CTA to a quiet link.
- Remove orbital/floating/3D decoration that does not explain value.
- Show statistics only when populated and as restrained proof, not metric cards.
- Stabilize image dimensions/loading and keep content visible before animations.
- Simplify About into image + narrative + concise evidence, handling empty features/stats/image cleanly.

### 6. Improve service discovery

- Use stable category IDs instead of array indexes.
- Implement keyboard-operable category selection with clear state.
- Remove scroll velocity, spring rotation, lifted middle cards, “Signature service”, and unnecessary overlays.
- Clarify service image, name, description, status, and action hierarchy.
- Coming-soon services must not look actionable.
- Handle empty categories/services without crashing or blank space.

### 7. Complete Contact behavior

- Ensure the POST route exists and is tested.
- Add required semantics, autocomplete, `aria-invalid`, and `aria-describedby`.
- Preserve form data on validation/server failures.
- Render accessible processing, success, validation, and retry feedback.
- Use the best available CMS fallback channel in order: WhatsApp, email, phone.
- Never render `href="#"` for missing contact data.
- Remove nested glass/glow styling.

### 8. Normalize Footer and page composition

- Render CMS links and social data without arbitrary positional slicing.
- Use a compact localized fallback navigation only when CMS links are absent.
- Keep external links safe and icon-only controls labeled.
- Maintain one `main`, one `h1`, coherent metadata, and a single page background system.

### 9. Make motion progressively enhanced

- Make `ScrollReveal` content visible by default.
- Reserve subtle animation for justified moments only.
- Ensure reduced-motion and no-JavaScript users receive all core content immediately.
- Remove unused effect components, imports, icon exports, and CSS selectors.

## Acceptance criteria

- Capsule navbar works structurally at mobile and desktop breakpoints.
- No gear button, settings popover, or visible System option remains.
- Explicit Light/Dark and ID/EN selections persist safely.
- Original CMS domains remain integrated and optional fields do not break layout.
- Footer social data matches the Filament repeater shape.
- `contact.submit` resolves and contact feature tests pass.
- Contact success, validation errors, server errors, and alternate contact fallback are visible and accessible.
- Hero has one dominant conversion action.
- Services have clear category/service hierarchy and keyboard-operable selection.
- Core content is visible without reveal activation.
- Gradient text, routine glass, repeated glow, velocity/parallax, 3D rotation, and repetitive reveal motion are removed.
- No new dependency or unrelated refactor is introduced.

## Verification

Run from the project root:

```powershell
php artisan test tests/Feature/LandingPageTest.php
php artisan test tests/Feature/ContactSubmissionTest.php
composer test
vendor\bin\pint --test
php artisan route:list --name=contact.submit
npm run build
```

Then inspect:

```powershell
git diff --check
git status --short
git diff --stat
```

Static anti-pattern checks:

```powershell
rg "gradient-text|glass-card|btn-primary-glow|luxury-|useVelocity|Signature service|value:\s*['\"]system['\"]|href=['\"]#['\"]" resources/js/Components/Landing resources/js/Pages/Landing.tsx resources/css/app.css
rg "initial=\{\{[^}]*opacity:\s*0|opacity:\s*0" resources/js/Components/Landing
```

Expected: no active matches for prohibited patterns, except a documented non-content transition if one remains.

## Non-goals

- No framework migration.
- No new UI or test dependency.
- No CMS schema expansion for multilingual content.
- No automatic server, browser, Playwright, screenshot, Lighthouse, or visual-diff run in this implementation pass.
- No git commit unless explicitly requested.
