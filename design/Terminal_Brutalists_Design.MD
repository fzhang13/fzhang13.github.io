---
name: Terminal Brutalist
colors:
  surface: '#0e150f'
  surface-dim: '#0e150f'
  surface-bright: '#333b34'
  surface-container-lowest: '#09100a'
  surface-container-low: '#161d17'
  surface-container: '#1a211b'
  surface-container-high: '#242c25'
  surface-container-highest: '#2f372f'
  on-surface: '#dde5da'
  on-surface-variant: '#bccabb'
  inverse-surface: '#dde5da'
  inverse-on-surface: '#2b322b'
  outline: '#869486'
  outline-variant: '#3d4a3e'
  surface-tint: '#4de082'
  primary: '#6bfb9a'
  on-primary: '#003919'
  primary-container: '#4ade80'
  on-primary-container: '#005e2d'
  inverse-primary: '#006d36'
  secondary: '#ffc640'
  on-secondary: '#402d00'
  secondary-container: '#e3aa00'
  on-secondary-container: '#5a4100'
  tertiary: '#ffd9c1'
  on-tertiary: '#4f2500'
  tertiary-container: '#ffb47f'
  on-tertiary-container: '#794418'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#6dfe9c'
  primary-fixed-dim: '#4de082'
  on-primary-fixed: '#00210c'
  on-primary-fixed-variant: '#005227'
  secondary-fixed: '#ffdf9f'
  secondary-fixed-dim: '#f9bd22'
  on-secondary-fixed: '#261a00'
  on-secondary-fixed-variant: '#5c4300'
  tertiary-fixed: '#ffdcc6'
  tertiary-fixed-dim: '#ffb784'
  on-tertiary-fixed: '#301400'
  on-tertiary-fixed-variant: '#6c3a0f'
  background: '#0e150f'
  on-background: '#dde5da'
  surface-variant: '#2f372f'
typography:
  headline-lg:
    fontFamily: JetBrains Mono
    fontSize: 24px
    fontWeight: '700'
    lineHeight: 32px
    letterSpacing: -0.02em
  headline-md:
    fontFamily: JetBrains Mono
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
    letterSpacing: 0em
  body-lg:
    fontFamily: JetBrains Mono
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
    letterSpacing: 0em
  body-sm:
    fontFamily: JetBrains Mono
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
    letterSpacing: 0em
  code-snippet:
    fontFamily: JetBrains Mono
    fontSize: 13px
    fontWeight: '400'
    lineHeight: 18px
    letterSpacing: 0em
  label-caps:
    fontFamily: JetBrains Mono
    fontSize: 12px
    fontWeight: '700'
    lineHeight: 16px
    letterSpacing: 0.1em
spacing:
  unit: 4px
  gutter: 16px
  margin-page: 32px
  container-max: 1440px
---

## Brand & Style
The design system is an uncompromising homage to the command-line interface. It rejects the "softness" of modern consumer UI in favor of a raw, low-level aesthetic that prioritizes functional density and developer authenticity. 

The personality is **Brutalist and Functional**. It should feel like a direct window into the machine's kernel. The emotional response is one of absolute control and technical precision. Every element must appear as if it were rendered by a terminal emulator, utilizing heavy borders, monospaced alignment, and high-contrast signaling. Visual flourishes are limited to technical artifacts: scanlines, block cursors, and ASCII-inspired layouts.

## Colors
The palette is rooted in the "Green Screen" and "Amber" phosphorus monitors of the late 20th century. 

- **Backgrounds:** The primary workspace is `#0A0A0A` (Pure Black/Deep Charcoal) to ensure maximum contrast and eliminate light bleed.
- **Accents:** "Terminal Green" (`#4ADE80`) is used for successful operations and primary actions. "System Amber" (`#FBBF24`) is reserved for warnings, pending states, and secondary highlights.
- **Status Codes:** Use a strict semantic mapping: `200 OK` (Green), `404 Not Found` (Amber), `500 Internal Error` (Red/`#F87171`).
- **Scanlines:** Apply a 2% opacity linear-gradient overlay of black lines across the entire viewport to simulate CRT hardware.

## Typography
This design system mandates a **Strict Monospaced** hierarchy. No proportional fonts are permitted. 

- **Font Choice:** JetBrains Mono is the standard for its exceptional legibility and developer-centric ligatures.
- **Styling:** Headings should be prefix-heavy (e.g., `root@system:~# Heading`). 
- **Micro-copy:** Use `label-caps` for metadata, status indicators, and table headers.
- **The Cursor:** Interactive text areas must feature a non-breaking `span` with a background-color matching the text color, set to a "blink" animation (1s interval) to simulate an active prompt.

## Layout & Spacing
The layout follows a **Rigid Grid** philosophy, reminiscent of a terminal grid (rows and columns). 

- **Grid:** Use a 12-column fluid grid, but snap element heights to 4px increments to maintain vertical rhythm.
- **Separators:** Replace standard dividers with ASCII strings. Use sequences like `+---+` for corners and `----------------` for horizontal rules.
- **Density:** High information density is preferred. Minimize "white space" in favor of "structured space" defined by borders rather than gaps.

## Elevation & Depth
In this design system, depth is achieved through **Structural Layering and Bold Borders**, not shadows or blurs.

- **Borders:** Every container must have a 1px or 2px solid border. Use `#262626` for standard containers and `#4ADE80` for active/focused states.
- **Tonal Layers:** To signify "elevation," the background color shifts slightly lighter (from `#0A0A0A` to `#1A1A1A`). 
- **No Shadows:** Shadows are strictly prohibited. Visual hierarchy is managed by border thickness and color intensity.
- **Inversions:** For the highest level of emphasis (e.g., a selected tab), invert the colors: background becomes `#4ADE80` and text becomes `#0A0A0A`.

## Shapes
The shape language is **Strictly Square**. 

- **Corner Radius:** All elements (buttons, inputs, cards, tags) must have a `0px` border-radius. 
- **Visual Style:** Rounded corners contradict the "raw code" aesthetic. Every intersection should be a sharp 90-degree angle.
- **Selection:** For checkboxes and radio buttons, use square boxes. A "selected" state is indicated by an "X" character or a solid fill.

## Components
- **Buttons:** Rectangular with 1px borders. Default state is green text on black. Hover state inverts the color (black text on green background). No transitions; the change should be instantaneous.
- **Inputs:** Styled as command line prompts. Prefix the input with a `>` character. The focus state is indicated by a thick 2px border or a blinking block cursor at the end of the text string.
- **Cards/Containers:** Use "Window" styling. A top bar should contain a title and simulated control characters (e.g., `[X] [_] [^]`).
- **Status Chips:** Small rectangular tags with labels like `[ 200 OK ]` or `[ 500 ERR ]`. Use brackets to enclose the text.
- **Lists:** Use bullet points that resemble terminal markers, such as `*`, `-`, or `=>`.
- **ASCII Progress Bars:** Loading states should be represented by `[||||||----]` style progress indicators rather than circular spinners.
- **Log Stream:** A dedicated component for outputting system messages in real-time, using `body-sm` with color-coded timestamps.