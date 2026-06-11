# Spine Pair Review — badwers-notify

## Overall verdict

The spine pair is structurally complete with correct section ordering and reasonably tight prose. However, three problems prevent it from passing muster: Key Flows don't cover two of three PRD User Journeys (UJ-2, UJ-3 have no dedicated flow), the visual mock exists but is cited in neither spine, and the EXPERIENCE.md sources path is broken. Fixing these mechanical gaps plus adding a missing Inspiration & Anti-patterns section would bring it to spec.

---

## 1. Flow coverage — FAIL (3 high, 1 medium, 1 low)

### Findings
- **[high]** UJ-2 (CDN import from PRD) has no dedicated Key Flow. KF-3/KF-4 cover stack behavior but not the CDN persona journey. *Fix:* add KF-5 with protagonist loading via `<script>` tag and calling `.config({ position: 'center-bottom' })`.
- **[high]** UJ-3 (Customization from PRD) has no dedicated Key Flow. *Fix:* add KF-6 with protagonist passing `typeStyles` and `icons` to `.config()` and verifying branded output.
- **[high]** KF-3 and KF-4 lack required structure: no named protagonist, no numbered steps, no explicit **Climax:** beat, no failure path. KF-3 (`EXPERIENCE.md:155`) and KF-4 (`EXPERIENCE.md:169`). *Fix:* restructure both flows with protagonist (Дима), numbered steps, a marked `**Climax:**` line (e.g., gap closes smoothly after removal), and a failure path (e.g., maxStack exceeded → oldest notification removed without animation).
- **[medium]** KF-2 (`EXPERIENCE.md:145`) has no explicit `**Climax:**` heading — the resolution describes manual close but the climax beat is unlabeled. *Fix:* add `**Climax:**` before line 152.
- **[low]** KF-1 (`EXPERIENCE.md:135`) has no failure path. *Fix:* add failure path — server returns 200 but DOM container is blocked by ad-blocker; notification fails silently, console warns.

---

## 2. Token completeness — PASS with caveats (2 medium)

### Findings
- **[medium]** Color token `stack-bg: transparent` (`DESIGN.md:20`) violates the spec requirement that color values be hex strings (`design-md-spec.md:15`). `transparent` is valid CSS but not a hex literal. *Fix:* use `'rgba(0,0,0,0)'` or specify allowed values in a `note` field.
- **[medium]** Frontmatter component names (e.g., `notify-container`, `notify-body`, `notify-content`) (`DESIGN.md:58-101`) don't match prose component names in the Components body section (`notify-info`, `notify-success`, `notify-close`) (`DESIGN.md:136-142`). The YAML defines structural anatomy tokens; the prose describes outward-facing type variants. These domains never cross-reference, which is confusing. *Fix:* either rename YAML keys to match prose, or add a mapping table in the Components section.
- All `{path.to.token}` references in prose body (`{colors.close-btn}`, `{colors.close-btn-hover}` at `DESIGN.md:142`) resolve correctly. ✓
- All color values except `stack-bg` are valid hex. ✓
- All typography, rounded, and spacing tokens are valid. ✓

---

## 3. Component coverage — PASS with 1 miss (1 medium)

### Findings
- **[medium]** `Stack` appears as a named component pattern in EXPERIENCE.md (`EXPERIENCE.md:67-73`) with behavioral rules and stack types, but it has no corresponding entry in DESIGN.md's Components prose section (`DESIGN.md:134-142`). Only the YAML frontmatter has `notify-stack` tokens. *Fix:* add a "Stack" row to DESIGN.md Components prose, referencing `{components.notify-stack}` and `{components.notify-stack-children}`.
- All other component names resolve across both spines: `Notification Card` (EXPERIENCE.md) ↔ `notify-info / notify-success / notify-attention / notify-warning` (DESIGN.md), and `Close Button` (EXPERIENCE.md) ↔ `notify-close` (DESIGN.md). ✓

---

## 4. State coverage — PASS with gaps (2 low)

### Findings
- **[low]** Empty stack state (no active notifications in a position) is not covered in the State Patterns table (`EXPERIENCE.md:79-84`). *Fix:* add row for `Empty` state — container exists but has no children; no visual output.
- **[low]** Mobile responsive layout (`EXPERIENCE.md:185-188`) is defined in a separate section but has no State Pattern entry. *Fix:* add responsive state row or add a note in State Patterns referencing the Responsive & Platform section.
- Visible, Hover, Closing, and Closed states cover the notification lifecycle well. ✓

---

## 5. Visual reference coverage — FAIL (1 high)

### Findings
- **[high]** The only visual mock is at `.working/key-screens.html` (an HTML mock showing 5 scenes: right-top stack, right-bottom + attention, center positions, dark theme, no-close-button). Neither DESIGN.md nor EXPERIENCE.md cites this file. Compare with examples: both `experience-example-mobile.md` and `experience-example-shadcn.md` include a `→ Composition reference:` line linking to their mockups. *Fix:* add `→ Composition reference: \`.working/key-screens.html\`` to DESIGN.md (after Brand & Style) and EXPERIENCE.md (after Information Architecture).
- `imports/` directory is empty. No `mockups/` or `wireframes/` directories exist. This is acceptable if `.working/` is the intended location for assets, but the directory should be renamed or documented.

---

## 6. Bloat & overspecification — PASS

Prose is compact relative to the examples. No pixel specs in prose where the frontmatter owns them. The Color prose section adds rationale (neutral card, green for success, etc.) without restating hex values verbatim, which is the correct pattern. The Layout section restates a few values (360px, gap 12px) but these are design rationale, not bloat. One minor observation: `[ASSUMPTION: ...]` annotations could be in an assumptions table rather than inline, but this is stylistic.

---

## 7. Inheritance discipline — FAIL (1 high, 1 medium)

### Findings
- **[high]** EXPERIENCE.md sources frontmatter (`EXPERIENCE.md:8`) resolves to `./docs/prd-badwers-notify.md`, a path that does not exist in this directory. The actual PRD is at `../../../prds/prd-task-2026-06-11/prd.md`. *Fix:* update sources path to relative reference from `ux-designs/ux-task-2026-06-11/` to the actual PRD location.
- **[medium]** Key Flows in EXPERIENCE.md do not reference UJ identifiers from the PRD by name. The examples (`experience-example-mobile.md`, `experience-example-shadcn.md`) trace flows back to user journeys (e.g., "Flow 1 corresponds to UJ-1"). *Fix:* add inline references, e.g., `*(maps to UJ-1)*` after KF-1 heading.
- DESIGN.md frontmatter has no `sources:` field. The spec does not require one, but for traceability it would be helpful.

---

## 8. Shape fit — PASS with advisory

DESIGN.md sections follow canonical order exactly (`design-md-spec.md:23-32`). ✓  
EXPERIENCE.md has all required sections (Foundation, IA, Voice & Tone, Component Patterns, State Patterns, Interaction Primitives, Accessibility Floor, Key Flows, Responsive & Platform). ✓  
Advisory: `Inspiration & Anti-patterns` is present in both example EXPERIENCE.md files but absent here. For a notification library, identifying rejected patterns (e.g., "no progress bars in v1", "no queue prioritization") would add clarity. Not a fail, but recommended.

---

## Finding summary

| Severity | Count | Categories |
|----------|-------|------------|
| high     | 5     | Flow coverage (3), Visual reference (1), Inheritance (1) |
| medium   | 4     | Flow coverage (1), Token completeness (2), Component coverage (1), Inheritance (1) |
| low      | 3     | Flow coverage (1), State coverage (2) |
| advisory | 1     | Shape fit (missing Inspiration & Anti-patterns) |

**Total: 12 findings (5 high, 4 medium, 3 low + 1 advisory)**

---

## Quick-fix checklist (high-severity only)

1. ✅ Add KF for UJ-2 (CDN import)
2. ✅ Add KF for UJ-3 (customization)
3. ✅ Restructure KF-3/KF-4 with protagonist, numbered steps, climax, failure
4. ✅ Link `.working/key-screens.html` from both spines
5. ✅ Fix EXPERIENCE.md sources path to point to actual PRD
