---
name: Warning Red Terminal
colors:
  surface: '#131313'
  surface-dim: '#131313'
  surface-bright: '#3a3939'
  surface-container-lowest: '#0e0e0e'
  surface-container-low: '#1c1b1b'
  surface-container: '#201f1f'
  surface-container-high: '#2a2a2a'
  surface-container-highest: '#353534'
  on-surface: '#e5e2e1'
  on-surface-variant: '#ebbbb4'
  inverse-surface: '#e5e2e1'
  inverse-on-surface: '#313030'
  outline: '#b18780'
  outline-variant: '#603e39'
  surface-tint: '#ffb4a8'
  primary: '#ffb4a8'
  on-primary: '#690100'
  primary-container: '#ff5540'
  on-primary-container: '#5c0000'
  inverse-primary: '#c00100'
  secondary: '#ffb5a0'
  on-secondary: '#601400'
  secondary-container: '#ff5625'
  on-secondary-container: '#541100'
  tertiary: '#ffb4a8'
  on-tertiary: '#690000'
  tertiary-container: '#ff5541'
  on-tertiary-container: '#5c0000'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#ffdad4'
  primary-fixed-dim: '#ffb4a8'
  on-primary-fixed: '#410000'
  on-primary-fixed-variant: '#930100'
  secondary-fixed: '#ffdbd1'
  secondary-fixed-dim: '#ffb5a0'
  on-secondary-fixed: '#3b0900'
  on-secondary-fixed-variant: '#872000'
  tertiary-fixed: '#ffdad4'
  tertiary-fixed-dim: '#ffb4a8'
  on-tertiary-fixed: '#410000'
  on-tertiary-fixed-variant: '#930000'
  background: '#131313'
  on-background: '#e5e2e1'
  surface-variant: '#353534'
typography:
  headline-lg:
    fontFamily: Space Grotesk
    fontSize: 24px
    fontWeight: '700'
    lineHeight: '1.2'
    letterSpacing: -0.02em
  headline-md:
    fontFamily: Space Grotesk
    fontSize: 18px
    fontWeight: '700'
    lineHeight: '1.2'
    letterSpacing: 0em
  body-md:
    fontFamily: Space Grotesk
    fontSize: 14px
    fontWeight: '400'
    lineHeight: '1.5'
    letterSpacing: 0.02em
  code-sm:
    fontFamily: Space Grotesk
    fontSize: 12px
    fontWeight: '400'
    lineHeight: '1.4'
    letterSpacing: 0.05em
  label-xs:
    fontFamily: Space Grotesk
    fontSize: 10px
    fontWeight: '700'
    lineHeight: '1'
    letterSpacing: 0.1em
spacing:
  unit: 4px
  gutter: 16px
  margin: 24px
  container-max: 1440px
---

## Brand & Style

This design system is engineered for high-stakes, mission-critical environments where every millisecond and every bit of data matters. The personality is aggressive, technical, and uncompromising. It evokes the feeling of a high-level security breach or a deep-system diagnostic tool running in a secure facility.

The aesthetic combines **Brutalism** with **Minimalism**. It rejects soft edges and decorative elements in favor of raw functionalism. The goal is to create an interface that feels like a physical piece of tactical hardware: sharp, cold, and intense.

## Colors

The color palette is built on a "Total Darkness" philosophy. The background is a deep, near-black charcoal to ensure that the primary red remains piercing and readable.

- **Primary Red (#FF0000):** Reserved for active alerts, primary prompts, and critical data points. It should feel radioactive and urgent.
- **Orange-Red (#FF4500):** Used for secondary warnings, hover states, and interactive elements that are not yet "Critical."
- **Deep Red (#B30000):** Used for inactive states or background fills to maintain the theme without overwhelming the user's vision.
- **Surface Neutrals:** Shades of charcoal (#0A0A0A, #121212, #1A1A1A) define the structural layers of the interface.

## Typography

This design system utilizes **Space Grotesk** to simulate a high-tech, monospaced environment while maintaining superior readability. To reinforce the terminal aesthetic, all typography should be set with slightly increased letter spacing for body text and heavy, compressed spacing for headlines.

Everything is strictly aligned to a baseline grid. Titles should always be in uppercase to command attention. Technical data and logs should use the `code-sm` style to maximize information density on the screen.

## Layout & Spacing

The layout follows a **Fixed Grid** model, reminiscent of early command-line interfaces. Use a strict 4px scaling system. Elements do not "float"; they are locked into containers that define the structure of the screen.

Content density should be high. Use 16px gutters to separate distinct data modules and 24px margins to frame the entire interface. The interface should feel "full" of information, minimizing empty space to emphasize the backend, data-heavy nature of the product.

## Elevation & Depth

This design system rejects the use of shadows and blurs. Depth is conveyed exclusively through **Tonal Layers** and **Bold Borders**.

- **Level 0 (Background):** #0A0A0A. The base of the application.
- **Level 1 (Modules):** #121212. Used for content containers. These should be framed with a 1px solid border of #1A1A1A or #B30000 depending on the priority of the module.
- **Level 2 (Interactions):** Elements that are being hovered or selected should utilize a #FF0000 1px border.

The hierarchy is "Flat but Framed." Instead of lifting elements off the page with shadows, we "cut" them into the dark background using high-contrast outlines.

## Shapes

The shape language of this design system is **Sharp (0px)**. There are no rounded corners in this system. Every button, input field, card, and chip is a perfect rectangle. This reinforces the serious, aggressive, and industrial nature of the terminal interface. 

Slanted edges (45-degree cuts) may be used sparingly on the corners of major section headers to evoke a "stealth tech" aesthetic, but the foundational primitive is always the hard-edged square.

## Components

### Buttons
Buttons are strictly rectangular.
- **Primary:** No fill, 1px #FF0000 border, #FF0000 text. On hover, #FF0000 fill with #0A0A0A text.
- **Ghost:** No fill, no border, #FF4500 text. On hover, 1px #FF4500 border.

### Inputs & Terminal Prompts
Input fields consist of a bottom border only (1px #B30000). When focused, the border becomes #FF0000 and a "block" cursor (a solid red rectangle) should blink at the end of the text string.

### Chips & Tags
Used for status indicators. They should be small, all-caps, with a 1px border. No background fill. 
- `[ STATUS: CRITICAL ]` (Red border/text)
- `[ STATUS: STABLE ]` (Grey border/text)

### Lists & Data Grids
Rows are separated by 1px #1A1A1A lines. Highlighting a row should change the background to a faint red tint (#FF0000 at 5% opacity) and change the text color to pure white for maximum contrast.

### Alerts
Alerts are full-width bars at the top of a module. They use a solid #FF0000 background with #0A0A0A bold uppercase text. They do not fade out; they must be manually dismissed or resolved by the system.