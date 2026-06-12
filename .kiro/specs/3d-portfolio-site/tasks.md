# Implementation Plan: 3D Portfolio Site

## Overview

Build a 3D parallax scroll-animated portfolio website for Umer Saiyad using Next.js 16, React Three Fiber, Tailwind CSS 4, and TypeScript. The implementation follows a progressive enhancement approach: semantic HTML content first, then 3D visuals layered on top. Tasks are ordered to establish foundational systems (theme, types, utilities) before building section components, and finally wiring everything together.

## Tasks

- [x] 1. Set up project dependencies and core configuration
  - [x] 1.1 Install 3D and animation dependencies
    - Install `@react-three/fiber`, `@react-three/drei`, `three`, and `@types/three`
    - Install testing dependencies: `vitest`, `@testing-library/react`, `@testing-library/jest-dom`, `jsdom`, `fast-check`
    - Configure Vitest in `vitest.config.ts` with jsdom environment and path aliases
    - _Requirements: 1.1, 1.2_

  - [x] 1.2 Define TypeScript interfaces and data models
    - Create `types/animation.ts` with `ScrollProgress`, `ParallaxConfig`, `ParallaxLayer`, `AnimationState`, `EntranceConfig`, `EntranceState` interfaces
    - Create `types/portfolio.ts` with `PortfolioData`, `SkillCategory`, `Skill`, `EducationEntry`, `Project`, `Testimonial`, `SocialLink` interfaces
    - Create `types/theme.ts` with `ThemeTokens` interface
    - _Requirements: 2.1, 2.2, 8.5, 9.2, 10.1_

  - [x] 1.3 Create portfolio data file
    - Create `data/portfolio.ts` with Umer Saiyad's personal info, skills (Frontend, Backend, Database, Tools categories), education (MCA from Uka Tarsadia University), projects (Law-Assist, HomeFixCare, RadioPlugger), testimonials, and social links (GitHub, LinkedIn, Email)
    - _Requirements: 5.2, 6.1, 6.4, 7.2, 8.1, 10.5_

- [x] 2. Implement theme system and Tailwind configuration
  - [x] 2.1 Configure Tailwind CSS 4 design tokens
    - Update `app/globals.css` with CSS custom properties for the dark futuristic palette: backgrounds (#0A0A0F, #12121A, #1A1A2E), foregrounds (#FFFFFF, #A0A0B0, #6B6B80), accents (cyan #00F5FF, purple #8B5CF6, blue #3B82F6), glow colors, glassmorphism values (blur 12px, opacity 0.15), typography (font-family, font-size scale), spacing (section 6rem, container max-w-7xl), and animation durations
    - Define utility classes for glow effects, gradient borders, and glassmorphism styling
    - _Requirements: 3.1, 3.2, 3.3, 3.4, 3.5_

  - [ ]* 2.2 Write property test for theme color contrast (Property 10)
    - **Property 10: Theme color contrast meets WCAG thresholds**
    - Implement `getContrastRatio(foreground, background)` utility in `lib/color-utils.ts`
    - Test that all theme text/background pairs meet 4.5:1 for normal text and 3:1 for large text
    - **Validates: Requirements 13.3**

- [x] 3. Implement scroll and animation utility functions
  - [x] 3.1 Implement scroll progress calculation
    - Create `lib/scroll-utils.ts` with `calculateScrollProgress(sectionTop, sectionHeight, viewportHeight, scrollOffset)` returning a normalized 0-1 value that monotonically increases as scroll moves through the section
    - _Requirements: 2.1_

  - [ ]* 3.2 Write property test for scroll progress normalization (Property 1)
    - **Property 1: Scroll progress is always normalized**
    - Use fast-check to generate random positive integers for sectionTop, sectionHeight, viewportHeight, scrollOffset
    - Assert result is always between 0 and 1 inclusive and monotonically increases with scrollOffset
    - **Validates: Requirements 2.1**

  - [x] 3.3 Implement parallax offset calculation
    - Create `lib/parallax-utils.ts` with `calculateParallaxOffset(progress, depth, reducedMotion?)` returning x/y/z offsets based on depth layer speeds (foreground 1.0x, midground 0.5x, background 0.25x), returning zero offsets when reducedMotion is true
    - _Requirements: 2.2, 13.2_

  - [ ]* 3.4 Write property tests for parallax depth ratios and reduced motion (Properties 2 & 9)
    - **Property 2: Parallax depth layers maintain speed ratios**
    - Assert foreground offset = 2× midground = 4× background for any progress value
    - **Property 9: Reduced motion disables all parallax offsets**
    - Assert all offsets are zero when reducedMotion=true
    - **Validates: Requirements 2.2, 13.2**

  - [x] 3.5 Implement stagger delay calculation
    - Create `lib/animation-utils.ts` with `calculateStaggerDelay(itemCount, maxDuration)` returning per-item delay between 100-200ms with total not exceeding maxDuration (1000ms)
    - _Requirements: 6.2_

  - [ ]* 3.6 Write property test for stagger delay constraints (Property 3)
    - **Property 3: Stagger delay respects timing constraints**
    - Use fast-check with random integers [1, 50] for itemCount
    - Assert per-item delay is 100-200ms and total ≤ 1000ms
    - **Validates: Requirements 6.2**

  - [x] 3.7 Implement device tier classification
    - Create `lib/device-utils.ts` with `getDeviceTier(viewportWidth)` returning "desktop" (≥1024), "tablet" (768-1023), or "mobile" (<768)
    - _Requirements: 12.1_

  - [ ]* 3.8 Write property test for device tier classification (Property 8)
    - **Property 8: Device tier classification from viewport width**
    - Use fast-check with random integers [0, 4000] for viewportWidth
    - Assert no gaps or overlaps in classification ranges
    - **Validates: Requirements 12.1**

  - [x] 3.9 Implement active section detection
    - Create `lib/navigation-utils.ts` with `getActiveSection(sections, scrollOffset, navHeight)` returning the section whose top is closest to but not below viewport top + navHeight
    - _Requirements: 11.3_

  - [ ]* 3.10 Write property test for active section detection (Property 7)
    - **Property 7: Active section detection**
    - Use fast-check to generate random section position arrays and scroll offsets
    - Assert exactly one section is identified as active
    - **Validates: Requirements 11.3**

- [x] 4. Checkpoint - Core utilities verified
  - Ensure all tests pass, ask the user if questions arise.

- [x] 5. Implement contact form validation
  - [x] 5.1 Implement contact form validation function
    - Create `lib/form-utils.ts` with `validateContactForm(data: ContactFormData)` returning errors for empty required fields, malformed email (RFC 5322), name > 100 chars, email > 254 chars, message > 1000 chars
    - _Requirements: 10.1, 10.2_

  - [ ]* 5.2 Write property test for contact form validation (Property 6)
    - **Property 6: Contact form validation correctness**
    - Use fast-check to generate random strings of varying lengths and formats
    - Assert errors returned for exactly the fields violating constraints, empty array when all valid
    - **Validates: Requirements 10.1, 10.2**

  - [x] 5.3 Implement project card formatting
    - Create `lib/project-utils.ts` with `formatProjectCard(project)` truncating description to 120 chars and clamping tech tags to 2-6
    - _Requirements: 8.5_

  - [ ]* 5.4 Write property test for project card constraints (Property 4)
    - **Property 4: Project card enforces display constraints**
    - Use fast-check to generate random strings and arrays of varying length
    - Assert description ≤ 120 chars and tag count between 2 and 6
    - **Validates: Requirements 8.5**

  - [x] 5.5 Implement testimonial count clamping
    - Create `lib/testimonial-utils.ts` with `clampTestimonialCount(testimonials)` returning between 2 and 10 testimonials
    - _Requirements: 9.5_

  - [ ]* 5.6 Write property test for testimonial carousel bounds (Property 5)
    - **Property 5: Testimonial carousel enforces count bounds**
    - Use fast-check to generate random arrays of length [0, 20]
    - Assert rendered count is between 2 and 10
    - **Validates: Requirements 9.5**

- [x] 6. Implement React hooks for scroll and animation
  - [x] 6.1 Create useScrollProgress hook
    - Create `hooks/useScrollProgress.ts` as a client component hook using IntersectionObserver for section visibility and throttled scroll listener for progress calculation
    - Return `ScrollProgress` with global, section, velocity, and direction values
    - _Requirements: 2.1, 2.3, 2.5_

  - [x] 6.2 Create useParallax hook
    - Create `hooks/useParallax.ts` consuming scroll progress and ParallaxConfig, returning computed x/y/z offsets using `calculateParallaxOffset`
    - _Requirements: 2.2_

  - [x] 6.3 Create useEntranceAnimation hook
    - Create `hooks/useEntranceAnimation.ts` using IntersectionObserver with configurable threshold (default 0.2), returning `EntranceState` with isVisible, hasAnimated, and CSS style object for transform + opacity
    - Respect `prefers-reduced-motion` by showing final state immediately
    - _Requirements: 2.4, 5.1, 6.2, 13.2_

  - [x] 6.4 Create usePerformanceMonitor hook
    - Create `hooks/usePerformanceMonitor.ts` tracking FPS via requestAnimationFrame, returning `PerformanceState` with fps, tier (high/medium/low), and shouldReduceComplexity flag
    - Tier thresholds: high ≥30 FPS, medium 20-30 FPS, low <20 FPS
    - _Requirements: 2.7, 12.1_

  - [x] 6.5 Create AccessibilityProvider
    - Create `providers/AccessibilityProvider.tsx` as a client component providing context for `prefersReducedMotion`, `isWebGLSupported`, and `deviceTier`
    - Use `matchMedia('(prefers-reduced-motion: reduce)')` and viewport width detection
    - _Requirements: 6.5, 13.1, 13.2_

- [x] 7. Implement 3D SceneManager and WebGL handling
  - [x] 7.1 Create SceneManager component
    - Create `components/3d/SceneManager.tsx` as a client component wrapping R3F `<Canvas>` with `ScrollControls` from drei
    - Implement WebGL support detection before mounting Canvas
    - Render 2D fallback children if WebGL unavailable
    - Implement Page Visibility API to pause/resume rendering on tab visibility change
    - Handle `webglcontextlost` event with 5-second restoration attempt, falling back to 2D if failed
    - Dispose GPU resources (geometries, materials, textures) on unmount
    - Integrate PerformanceMonitor for adaptive rendering
    - _Requirements: 1.1, 1.2, 1.3, 1.4, 1.5, 1.6_

  - [ ]* 7.2 Write unit tests for SceneManager
    - Test WebGL detection logic and fallback rendering
    - Test visibility pause/resume behavior
    - Test context loss handling
    - _Requirements: 1.3, 1.4, 1.6_

- [x] 8. Checkpoint - Hooks and 3D infrastructure verified
  - Ensure all tests pass, ask the user if questions arise.

- [x] 9. Implement NavigationBar component
  - [x] 9.1 Create NavigationBar component
    - Create `components/NavigationBar.tsx` as a client component with fixed positioning
    - Render links to all sections: Hero, About, Skills, Education, Projects, Testimonials, Contact
    - Implement active section highlighting using `getActiveSection` utility
    - Implement smooth scroll on link click (300-800ms duration)
    - Implement mobile hamburger menu for viewport < 768px with open/close transition (400ms)
    - Close mobile menu after navigation link activation
    - Support full keyboard navigation (Tab to focus, Enter to activate)
    - Apply dark futuristic theme styling with glow effects on hover
    - _Requirements: 11.1, 11.2, 11.3, 11.4, 11.5, 11.6, 11.7, 3.2, 3.4_

  - [ ]* 9.2 Write unit tests for NavigationBar
    - Test all links render correctly
    - Test keyboard navigation (Tab, Enter)
    - Test hamburger menu toggle on mobile viewport
    - Test active section highlighting
    - _Requirements: 11.4, 11.7, 13.4_

- [x] 10. Implement Hero Section
  - [x] 10.1 Create HeroSection component
    - Create `components/sections/HeroSection.tsx` as a client component
    - Display "Umer Saiyad" name and "Full Stack Web Developer" title with animated text reveal (complete within 1.5s)
    - Include a 3D animated geometry (e.g., rotating torus knot or icosahedron) occupying ≥40% viewport as centerpiece
    - Full viewport height (100vh) on initial load
    - Include CTA button linking to Projects section with smooth scroll
    - Implement scroll-driven exit animation for 3D model tied to scroll progress
    - Apply dark futuristic theme with glow effects
    - _Requirements: 4.1, 4.2, 4.3, 4.4, 4.5, 4.6, 4.7_

  - [ ]* 10.2 Write unit tests for HeroSection
    - Test name and title render correctly
    - Test CTA element is present and links to projects
    - Test full viewport height styling
    - _Requirements: 4.2, 4.4, 4.7_

- [x] 11. Implement About Section
  - [x] 11.1 Create AboutSection component
    - Create `components/sections/AboutSection.tsx` as a client component
    - Display professional summary (50-200 words) including MCA degree and Enacton Technologies internship
    - Include a 3D element positioned adjacent to/behind content without obscuring text
    - Use `useEntranceAnimation` for parallax entrance effect (800ms, threshold 0.2)
    - Content remains visible after animation completes (does not revert)
    - _Requirements: 5.1, 5.2, 5.3, 5.4_

- [x] 12. Implement Skills Section
  - [x] 12.1 Create SkillsSection component
    - Create `components/sections/SkillsSection.tsx` as a client component
    - Display skills grouped by category: Frontend, Backend, Database, Tools
    - Include all required technologies: React, Next.js, Node.js, Express, MongoDB, PostgreSQL, TypeScript, Tailwind CSS
    - Implement staggered entrance animation (100-200ms delay per item, full category within 1s) using `calculateStaggerDelay`
    - Represent each skill with a 3D or animated visual indicator plus text label
    - Respect reduced-motion: show final state without animations
    - _Requirements: 6.1, 6.2, 6.3, 6.4, 6.5_

  - [ ]* 12.2 Write unit tests for SkillsSection
    - Test all required skills render with text labels
    - Test category grouping
    - Test reduced-motion behavior
    - _Requirements: 6.1, 6.4, 6.5_

- [x] 13. Implement Education Section
  - [x] 13.1 Create EducationSection component
    - Create `components/sections/EducationSection.tsx` as a client component
    - Display timeline or card-based layout with MCA degree, Uka Tarsadia University, field of study, and duration
    - Animate into view within 800ms on viewport entry
    - Include a 3D or animated visual element alongside timeline content responding to scroll progress
    - _Requirements: 7.1, 7.2, 7.3_

- [x] 14. Implement Projects Section
  - [x] 14.1 Create ProjectsSection component
    - Create `components/sections/ProjectsSection.tsx` as a client component
    - Display project cards for Law-Assist, HomeFixCare, and RadioPlugger using `formatProjectCard`
    - Each card shows title, truncated description (≤120 chars), and 2-6 tech tags in default state
    - Implement 3D entrance effect on viewport entry (rotation/depth/scale, 600ms)
    - On hover (pointer devices): reveal full description, tech stack list, and links within 300ms
    - On click/tap: navigate to external link in new tab
    - On touch devices: first tap reveals content, second tap navigates
    - _Requirements: 8.1, 8.2, 8.3, 8.4, 8.5, 8.6_

  - [ ]* 14.2 Write unit tests for ProjectsSection
    - Test all three projects render
    - Test description truncation and tag clamping
    - Test external link opens in new tab
    - _Requirements: 8.1, 8.4, 8.5_

- [x] 15. Checkpoint - Section components verified
  - Ensure all tests pass, ask the user if questions arise.

- [x] 16. Implement Testimonials Section
  - [x] 16.1 Create TestimonialsSection component
    - Create `components/sections/TestimonialsSection.tsx` as a client component
    - Display testimonial cards with name, role, and quote text
    - Implement carousel layout with navigation controls (next, previous, indicator dots)
    - Transitions between cards complete within 500ms with easing and 3D animation effect
    - Staggered entrance animation on viewport entry (800ms)
    - Clamp displayed testimonials between 2 and 10 using `clampTestimonialCount`
    - _Requirements: 9.1, 9.2, 9.3, 9.4, 9.5_

  - [ ]* 16.2 Write unit tests for TestimonialsSection
    - Test testimonial cards render with name, role, quote
    - Test carousel navigation controls
    - Test count clamping
    - _Requirements: 9.2, 9.3, 9.5_

- [x] 17. Implement Contact Section
  - [x] 17.1 Create ContactSection component
    - Create `components/sections/ContactSection.tsx` as a client component
    - Implement ContactForm with name (max 100), email (max 254), message (max 1000) fields using `validateContactForm`
    - Display inline error messages adjacent to invalid fields without page reload
    - On valid submission: send message, show success confirmation within 10s, clear fields
    - On failure: display error message, preserve entered data
    - Associate all inputs with visible `<label>` elements
    - Use `aria-describedby` for error messages identifying field and validation rule
    - Display social links for GitHub, LinkedIn, Email with 3D tilt/glow hover animation (300ms)
    - _Requirements: 10.1, 10.2, 10.3, 10.4, 10.5, 10.6, 13.5_

  - [ ]* 17.2 Write unit tests for ContactSection
    - Test form fields render with labels
    - Test inline validation error display
    - Test social links render with correct hrefs
    - Test aria-describedby associations on error
    - _Requirements: 10.1, 10.2, 10.5, 13.5_

- [x] 18. Implement page layout and accessibility wiring
  - [x] 18.1 Create root page layout with all sections
    - Update `app/page.tsx` to compose all section components in order: Hero, About, Skills, Education, Projects, Testimonials, Contact
    - Wrap with `AccessibilityProvider` and conditionally render `SceneManager` (loaded via `next/dynamic` with `ssr: false`)
    - Use semantic HTML (`<main>`, `<section>`, `<nav>`, `<header>`, `<footer>`)
    - Add skip navigation link as first focusable element moving focus to main content
    - Add `aria-label` or `aria-describedby` for informative 3D content, `aria-hidden="true"` for decorative 3D elements
    - _Requirements: 12.5, 13.1, 13.6_

  - [x] 18.2 Implement responsive 3D complexity adaptation
    - In SceneManager, use `deviceTier` from AccessibilityProvider to control rendering: desktop = full 3D, tablet = 50% reduced particles, mobile = simplified 2D/static fallback
    - Implement lazy-loading for 3D models/assets >100KB not in initial viewport using React Suspense
    - Display skeleton placeholders while loading; show static fallback after 10s timeout
    - _Requirements: 12.1, 12.3, 12.4_

  - [x] 18.3 Implement keyboard scroll and parallax integration
    - Ensure keyboard navigation (Tab, Arrow keys) triggers scroll position updates and parallax/entrance animations identical to pointer-based scrolling
    - _Requirements: 2.6, 13.4_

- [x] 19. Final checkpoint - Full integration verified
  - Ensure all tests pass, ask the user if questions arise.

## Notes

- Tasks marked with `*` are optional and can be skipped for faster MVP
- Each task references specific requirements for traceability
- Checkpoints ensure incremental validation
- Property tests validate universal correctness properties from the design document
- Unit tests validate specific examples and edge cases
- Read `node_modules/next/dist/docs/` for Next.js 16 API guidance before implementing components
- All 3D components must be client components loaded with `next/dynamic` and `ssr: false`
- The single shared R3F Canvas approach avoids multiple WebGL context limitations

## Task Dependency Graph

```json
{
  "waves": [
    { "id": 0, "tasks": ["1.1", "1.2", "1.3"] },
    { "id": 1, "tasks": ["2.1", "3.1", "3.3", "3.5", "3.7", "3.9", "5.1", "5.3", "5.5"] },
    { "id": 2, "tasks": ["2.2", "3.2", "3.4", "3.6", "3.8", "3.10", "5.2", "5.4", "5.6"] },
    { "id": 3, "tasks": ["6.1", "6.2", "6.3", "6.4", "6.5"] },
    { "id": 4, "tasks": ["7.1"] },
    { "id": 5, "tasks": ["7.2", "9.1"] },
    { "id": 6, "tasks": ["9.2", "10.1", "11.1", "12.1", "13.1"] },
    { "id": 7, "tasks": ["10.2", "12.2", "14.1", "16.1", "17.1"] },
    { "id": 8, "tasks": ["14.2", "16.2", "17.2"] },
    { "id": 9, "tasks": ["18.1", "18.2", "18.3"] }
  ]
}
```
