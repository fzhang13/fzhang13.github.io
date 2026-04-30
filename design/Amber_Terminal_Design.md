---
name: Amber Terminal
colors:
  surface: '#161404'
  surface-dim: '#161404'
  surface-bright: '#3d3a25'
  surface-container-lowest: '#110e02'
  surface-container-low: '#1f1c0a'
  surface-container: '#23200d'
  surface-container-high: '#2d2a17'
  surface-container-highest: '#383521'
  on-surface: '#eae3c5'
  on-surface-variant: '#d7c4ac'
  inverse-surface: '#eae3c5'
  inverse-on-surface: '#34311d'
  outline: '#9f8e78'
  outline-variant: '#524533'
  surface-tint: '#ffba43'
  primary: '#ffd597'
  on-primary: '#432c00'
  primary-container: '#ffb000'
  on-primary-container: '#6a4700'
  inverse-primary: '#805600'
  secondary: '#ffb787'
  on-secondary: '#502400'
  secondary-container: '#ff8000'
  on-secondary-container: '#5e2b00'
  tertiary: '#eedaab'
  on-tertiary: '#3b2f0e'
  tertiary-container: '#d1be91'
  on-tertiary-container: '#5a4c29'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#ffddaf'
  primary-fixed-dim: '#ffba43'
  on-primary-fixed: '#281800'
  on-primary-fixed-variant: '#614000'
  secondary-fixed: '#ffdcc7'
  secondary-fixed-dim: '#ffb787'
  on-secondary-fixed: '#311300'
  on-secondary-fixed-variant: '#723600'
  tertiary-fixed: '#f5e1b2'
  tertiary-fixed-dim: '#d8c598'
  on-tertiary-fixed: '#241a00'
  on-tertiary-fixed-variant: '#534523'
  background: '#161404'
  on-background: '#eae3c5'
  surface-variant: '#383521'
typography:
  headline-lg:
    fontFamily: Space Grotesk
    fontSize: 48px
    fontWeight: '700'
    lineHeight: '1.1'
    letterSpacing: -0.05em
  headline-md:
    fontFamily: Space Grotesk
    fontSize: 32px
    fontWeight: '600'
    lineHeight: '1.2'
    letterSpacing: -0.02em
  body-lg:
    fontFamily: Space Grotesk
    fontSize: 18px
    fontWeight: '400'
    lineHeight: '1.6'
    letterSpacing: 0.02em
  body-md:
    fontFamily: Space Grotesk
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.5'
    letterSpacing: 0.02em
  label-sm:
    fontFamily: Space Grotesk
    fontSize: 12px
    fontWeight: '700'
    lineHeight: '1'
    letterSpacing: 0.1em
spacing:
  unit: 8px
  gutter: 24px
  margin: 40px
  container-max: 1200px
---

## Brand & Style

This design system is a love letter to the early era of computing, specifically the high-persistence phosphor monitors of the 1980s. It prioritizes extreme legibility within a monochromatic constraint, evoking a sense of focused, "low-level" technical authority. 

The style is a hybrid of **Digital Brutalism** and **Tactile Retro**. It avoids modern luxuries like drop shadows and depth gradients in favor of structural integrity, high-contrast boundaries, and simulated hardware artifacts. The goal is to make the user feel as though they are interfacing directly with a mainframe, where every character carries weight and every interaction is intentional.

## Colors

The color palette is strictly monochromatic, centered around the iconic "Amber" phosphor P3 emission. 

- **Primary (#FFB000):** Used for all active text, icons, and primary structural borders. It represents the "glowing" state of the phosphor.
- **Secondary (#FF8000):** Reserved for warnings or intense highlights to provide a subtle chromatic shift without breaking the monochrome aesthetic.
- **Tertiary (#241A00):** Used for "ghost" text or inactive states, simulating the faint trail left by high-persistence screens.
- **Neutral (#0A0800):** The deep, near-black "glass" of the CRT tube. 

A global overlay should apply a faint, horizontal scanline texture (2px height, 10% opacity) across all colors to reinforce the hardware metaphor.

## Typography

This design system utilizes **Space Grotesk** to bridge the gap between technical geometric precision and modern readability. While the font is not a true monospaced typeface, it should be implemented with `font-variant-numeric: tabular-nums` and, where possible, tight tracking for headlines to mimic the character density of vintage BIOS screens.

For body text, generous line height is required to prevent the high-contrast amber from causing visual fatigue. All labels must be uppercase to maintain the "command line" aesthetic.

## Layout & Spacing

The layout philosophy is based on a **Fixed Grid** model that simulates the constraints of a physical monitor. The interface is contained within a 12-column grid with 24px gutters, but the entire "screen" should have a generous 40px internal margin to mimic the bezel of a CRT.

Everything is aligned to an 8px base unit. Components should never use fluid percentages for height; they should snap to the vertical rhythm of the typography to ensure that borders always align perfectly with text rows.

## Elevation & Depth

In this design system, depth is conveyed through **Tonal Layers and Bold Borders** rather than shadows or blurs. 

1.  **Level 0 (Floor):** The near-black background (#0A0800).
2.  **Level 1 (Surface):** Defined by a 1px solid border of #FFB000. 
3.  **Level 2 (Active/Focus):** Defined by a 2px solid border or a solid fill of #FFB000 with "knockout" text (text rendered in the background color).

To simulate the glow of a phosphor screen, high-elevation elements (like active buttons or alerts) may utilize a subtle `text-shadow` or `box-shadow` with 0px blur and a 2px offset in the primary color, creating a "doubled" or "ghosting" effect rather than a soft shadow.

## Shapes

The shape language is strictly **Sharp (0)**. There are no rounded corners in the interface. Every button, input field, and container is a perfect rectangle. This reinforces the rigid, grid-based nature of 80s computing environments.

The only exception to this rule is the "Screen Wrap," which may have a slight curvature on the outermost container of the entire application to simulate the physical glass of a CRT monitor.

## Components

### Buttons
Buttons are rendered as solid #FFB000 blocks with the background color used for the text (inverted). On hover, the button should flicker or transition to a thick 2px border with amber text.

### Input Fields
Inputs are simple 1px amber underlines or full-box outlines. The cursor must be a solid amber block (`█`) that blinks at a frequency of 1Hz.

### Chips & Tags
These are small, uppercase-only text elements enclosed in brackets, e.g., `[ STATUS: OK ]`. They do not use background fills unless they are in an "Error" or "Critical" state.

### Lists
Lists should use ASCII-inspired bullets such as `>` or `*`. Hovering over a list item should prefix it with a chevron (`>`) to indicate selection.

### Cards
Cards are containers with a 1px amber border. Headers within cards are separated by a single-pixel horizontal line that spans the full width of the container.

### System Utilities
- **Scanline Overlay:** A fixed-position div with a repeating linear gradient to simulate CRT lines.
- **Vignette:** A subtle radial gradient on the main viewport, darkening the corners to mimic light fall-off on a tube screen.
- **Terminal Scroll:** Scrollbars are thick, blocky, and only appear when necessary, using the same amber-on-black color scheme.