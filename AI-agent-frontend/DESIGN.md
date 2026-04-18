# Design System: Intelligent Fluidity

## 1. Overview & Creative North Star
**Creative North Star: "The Ethereal Intelligence"**

This design system moves away from the rigid, boxed-in layouts of traditional SaaS and toward a cinematic, editorial experience. We are not building a dashboard; we are building an interface for a living, breathing intelligence. The aesthetic centers on the concept of light passing through dark matter—where depth is created through transparency and tonal shifts rather than hard lines.

To break the "template" look, designers must embrace:
*   **Intentional Asymmetry:** Avoid perfectly centered grids. Use off-kilter layouts where text blocks and interactive elements overlap slightly to create movement.
*   **High-Contrast Scale:** Dramatically large display type paired with micro-labels to create a sense of professional authority.
*   **Breathing Room:** White space (or in this case, "Navy Space") is a functional component. It directs the user's eye and signifies premium quality.

---

## 2. Colors & Surface Architecture
Our palette is rooted in the depths of `surface-container-lowest` (#0A0E17), escalating through layers of light and shadow.

### The "No-Line" Rule
**Explicit Instruction:** You are prohibited from using 1px solid borders to section off content. Boundaries must be defined through background color shifts or tonal transitions.
*   To separate a sidebar from a main view, use `surface-container-low` against a `background` base.
*   To define a card, use a subtle shift from `surface-container` to `surface-container-high`.

### Surface Hierarchy & Nesting
Treat the UI as a series of physical layers—like stacked sheets of frosted glass.
*   **Base:** `background` (#0F131C)
*   **Level 1 (Sections):** `surface-container-low` (#181B25)
*   **Level 2 (Cards/Modules):** `surface-container` (#1C1F29)
*   **Level 3 (Floating Elements):** `surface-container-highest` (#31353F)

### The "Glass & Gradient" Rule
Standard flat colors lack "soul." 
*   **Glassmorphism:** For overlays, modals, and navigation bars, use semi-transparent surface colors with a `backdrop-filter: blur(20px)`. This allows the vibrant `primary` (#D0BCFF) and `secondary` (#5DE6FF) accents to bleed through the dark UI, creating a sense of "Fluidity."
*   **Signature Textures:** Main CTAs should utilize a linear gradient from `primary` (#D0BCFF) to `primary-container` (#A078FF) at a 135-degree angle.

---

## 3. Typography
We use a three-font strategy to balance technical precision with editorial elegance.

*   **Display & Headlines (Space Grotesk):** This is our "Architectural" voice. It is used for large-scale messaging. The geometric nature of Space Grotesk feels engineered and futuristic. 
    *   *Styling:* Tighten the line height (`leading-none`) but keep letter spacing neutral.
*   **Titles & Body (Inter):** Our "Functional" voice. Inter provides the readability required for complex AI data.
    *   *Styling:* Apply `tracking-wide` (generous letter spacing) to all body text to enhance the "tech-forward" feel.
*   **Labels (Manrope):** Our "Industrial" voice. Used for metadata and micro-copy. Manrope's slightly condensed feel works perfectly for high-density information.

---

## 4. Elevation & Depth
In this system, depth is a tool for focus, not just decoration.

### The Layering Principle
Achieve lift by "stacking" tokens. A `surface-container-lowest` card placed on a `surface-container-low` background creates a natural, recessed effect. Conversely, a `surface-bright` element on a `surface` background creates an immediate focal point.

### Ambient Shadows & Glows
*   **Floating Elements:** When an element must float (e.g., a dropdown), use a shadow with a 40px–60px blur and a 4% opacity. The shadow color must be a tinted version of `primary` (#D0BCFF) rather than black, creating a subtle "glow" rather than a dark void.
*   **The "Ghost Border" Fallback:** If accessibility requires a container boundary, use the `outline-variant` token at **15% opacity**. This creates a hint of a container without breaking the "No-Line" rule.

---

## 5. Components

### Buttons
*   **Primary:** Gradient from `primary` to `primary-container`. Use `rounded-full` for a fluid, organic feel. Text should be `on-primary-fixed` (#23005C).
*   **Secondary:** Ghost style with an `outline-variant` (20% opacity) and `secondary` (#5DE6FF) text. 
*   **Interactions:** On hover, primary buttons should emit a subtle outer glow (`primary` at 20% opacity).

### Input Fields
*   **Visuals:** No bottom lines or boxes. Use `surface-container-highest` as the background with a `rounded-md` corner. 
*   **Focus State:** The background remains the same, but a 1px "Ghost Border" of `secondary` (#5DE6FF) at 30% opacity appears, accompanied by a subtle cyan outer glow.

### Cards & Intelligence Modules
*   **Rule:** Forbid the use of divider lines. 
*   **Alternative:** Use vertical white space from the spacing scale (e.g., 2rem padding) or shift the inner background to `surface-container-low` to separate header from content.
*   **AI Pulse:** For active AI states, use a slow-pulsing background gradient that moves between `surface-container` and `surface-container-high`.

### Chips & Tags
*   **Selection Chips:** Use `secondary-container` with `on-secondary-container` text. Corners should be `rounded-full`.
*   **Status Chips:** Use `tertiary` (#DDB8FF) for "Neutral/Processing" and `error` (#FFB4AB) for "Issues."

---

## 6. Do's and Don'ts

### Do
*   **Do** use asymmetrical margins to create a "custom-coded" look.
*   **Do** use `display-lg` typography for impact, even if the text is short.
*   **Do** rely on `backdrop-blur` for all top-level navigational elements.
*   **Do** use `secondary` (#5DE6FF) as a highlight for data points and "active" AI markers.

### Don't
*   **Don't** use 100% opaque, high-contrast borders. It kills the "Fluidity" theme.
*   **Don't** use pure black (#000000). The darkest point should always be `surface-container-lowest` (#0A0E17).
*   **Don't** clutter the UI. If a screen feels busy, increase the padding—never add a divider line.
*   **Don't** use standard "drop shadows." Use the Ambient Glow method described in Section 4.