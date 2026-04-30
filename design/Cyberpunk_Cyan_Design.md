---
name: Cyberpunk Cyan Terminal
colors:
  surface: '#0c1324'
  surface-dim: '#0c1324'
  surface-bright: '#33394c'
  surface-container-lowest: '#070d1f'
  surface-container-low: '#151b2d'
  surface-container: '#191f31'
  surface-container-high: '#23293c'
  surface-container-highest: '#2e3447'
  on-surface: '#dce1fb'
  on-surface-variant: '#b9cac9'
  inverse-surface: '#dce1fb'
  inverse-on-surface: '#2a3043'
  outline: '#839493'
  outline-variant: '#3a4a49'
  surface-tint: '#00dddd'
  primary: '#ffffff'
  on-primary: '#003737'
  primary-container: '#00fbfb'
  on-primary-container: '#007070'
  inverse-primary: '#006a6a'
  secondary: '#a7cce1'
  on-secondary: '#0a3445'
  secondary-container: '#264b5d'
  on-secondary-container: '#96bacf'
  tertiary: '#ffffff'
  on-tertiary: '#003544'
  tertiary-container: '#b9eaff'
  on-tertiary-container: '#006d89'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#00fbfb'
  primary-fixed-dim: '#00dddd'
  on-primary-fixed: '#002020'
  on-primary-fixed-variant: '#004f4f'
  secondary-fixed: '#c2e8fe'
  secondary-fixed-dim: '#a7cce1'
  on-secondary-fixed: '#001e2b'
  on-secondary-fixed-variant: '#264b5d'
  tertiary-fixed: '#b9eaff'
  tertiary-fixed-dim: '#81d1f0'
  on-tertiary-fixed: '#001f29'
  on-tertiary-fixed-variant: '#004d62'
  background: '#0c1324'
  on-background: '#dce1fb'
  surface-variant: '#2e3447'
typography:
  headline-lg:
    fontFamily: spaceGrotesk
    fontSize: 32px
    fontWeight: '700'
    lineHeight: '1.2'
    letterSpacing: -0.02em
  headline-md:
    fontFamily: spaceGrotesk
    fontSize: 24px
    fontWeight: '600'
    lineHeight: '1.2'
    letterSpacing: 0.02em
  body-lg:
    fontFamily: inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.6'
    letterSpacing: 0.01em
  body-sm:
    fontFamily: inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: '1.5'
    letterSpacing: 0.01em
  label-mono:
    fontFamily: spaceGrotesk
    fontSize: 12px
    fontWeight: '500'
    lineHeight: '1'
    letterSpacing: 0.1em
  terminal-code:
    fontFamily: monospace
    fontSize: 14px
    fontWeight: '400'
    lineHeight: '1.5'
    letterSpacing: 0em
spacing:
  base: 4px
  xs: 8px
  sm: 16px
  md: 24px
  lg: 40px
  xl: 64px
  gutter: 16px
  margin: 24px
---

## Brand & Style

This design system is engineered to evoke the atmosphere of a high-performance command center. It targets technical power users who value precision, speed, and a clandestine aesthetic. The brand personality is "Elite Technicality"—sophisticated, cold, and hyper-efficient.

The style is a hybrid of **Brutalism** and **Neon Minimalism**. It rejects organic forms in favor of hard edges, fixed-width proportions, and high-contrast signaling. The visual language utilizes "Bloom" effects (neon glows) to indicate activity and importance, contrasting against a void-like background to minimize eye strain during long-term operational use.

## Colors

The palette is strictly functional, rooted in a deep obsidian navy (`#020617`) that serves as the "null" state. The primary engine of the design system is **Electric Cyan** (`#00FFFF`), used exclusively for interactive elements, data highlights, and "on" states. 

Secondary and tertiary cyans are used for structural depth—borders, dividers, and inactive icons—to ensure the interface remains legible without overwhelming the user with high-frequency light. Status colors should follow the terminal convention: Warning (Amber), Error (Bright Red), and Success (Electric Cyan).

## Typography

This design system utilizes **Space Grotesk** for its geometric, technical character in headlines and UI labels, providing a futuristic "calculated" feel. **Inter** is employed for body copy to ensure high readability during data-heavy tasks.

While the provided fonts cover the UI Shell, all actual terminal output and code blocks must fall back to a system monospaced font (e.g., JetBrains Mono, Fira Code, or SF Mono). Headlines should utilize tight tracking, while labels should be widely tracked and uppercased to mimic military-spec instrumentation.

## Layout & Spacing

The layout follows a **Fluid Grid** model within strict modular panels. UI elements are aligned to a 4px baseline grid to maintain mathematical rigor. Layouts should feel like a "dashboard" of independent modules; use 16px gutters between panels to create clear separation.

Information density should be high. Use thin Cyan borders (1px) to define zones rather than generous whitespace. Padding within components should be symmetrical and tight (8px or 16px) to maximize the screen's data-to-pixel ratio.

## Elevation & Depth

Hierarchy in this design system is achieved through **Tonal Layers and Bloom**, rather than traditional shadows. 

1.  **Floor:** The base background layer is `#020617`.
2.  **Panels:** Secondary surfaces use a slightly lighter tint or a 1px border of `#083344`.
3.  **Active Elements:** Elements that are "focused" or "active" utilize a "Bloom" effect—a box-shadow with a 4px to 12px blur radius using the Primary Cyan color at 30-50% opacity.
4.  **Glass:** For modal overlays, use a backdrop-blur of 10px with a 60% opacity fill of the neutral background color to simulate a heads-up display (HUD).

## Shapes

The shape language is strictly **Sharp (0px)**. Every button, input field, panel, and card must have 90-degree corners. This reinforces the high-tech, brutalist nature of the design system. 

To add visual interest without rounding, use "clipped corners" (dog-ear notches) on primary containers or buttons using CSS clip-path, which mimics military hardware or sci-fi interface plating.

## Components

### Buttons
Buttons are 1px Cyan outlines. On hover, the button fills with a 10% Cyan tint and gains an external 8px "Bloom" (glow). Text inside buttons should be uppercase `label-mono`.

### Terminal Inputs
Inputs consist of a prompt character (`> `) followed by text. They do not have background fills; they are underlined with a 1px Cyan stroke. The cursor is a solid Cyan block that pulses (on/off) every 500ms.

### Chips / Tags
Chips are small, sharp-edged rectangles with a subtle `#0E7490` border. When "active," the background becomes solid Cyan and the text becomes Obsidian Black (`#020617`).

### Cards & Panels
Panels must have a visible 1px border. The top-left corner of a panel may feature a small "tag" or "label" indicating the panel's function (e.g., "SYSTEM_LOGS" or "NETWORK_TRAFFIC").

### Checkboxes
Checkboxes are simple 12px squares. When checked, they contain a solid 6px Cyan square in the center, rather than a checkmark icon, to maintain the geometric terminal feel.

### Progress Bars
Progress bars should be segmented (divided into small vertical blocks) rather than a solid smooth fill, simulating old-school data loading.