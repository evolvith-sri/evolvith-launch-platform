# Evolvith Launch Platform RC1 — Component Inventory & Architecture Notes

> **Document ID**: RC1-SPEC-001  
> **Release Target**: Release Candidate 1 (RC1)  
> **Order ID**: BO-0002  
> **Version**: 1.0.0-RC1  
> **Status**: COMPLETED & VERIFIED  

---

## 1. Component Inventory

| Component Name | File Location | Purpose & Function | Accessibility (WCAG AAA) |
| :--- | :--- | :--- | :--- |
| **Navbar** | `src/components/Navbar.tsx` | Fixed, scroll-aware header with backdrop blur & navigation. | Keyboard focus rings, mobile menu ARIA expanded. |
| **Footer** | `src/components/Footer.tsx` | Minimal luxury enterprise footer with live system status. | Semantic `<footer>`, high contrast links. |
| **Hero** | `src/components/Hero.tsx` | 5-second value delivery hero with CTO trust indicators. | Dynamic heading hierarchy (`h1`), `aria-labelledby`. |
| **ProductCard** | `src/components/ProductCard.tsx` | Reusable card answering 4 core executive questions. | Keyboard focus states, explicit purchase buttons. |
| **TrustLayer** | `src/components/TrustLayer.tsx` | Authentic enterprise trust & governance proof points. | High contrast cards, zero inflated claims. |
| **ErrorBoundary** | `src/components/ErrorBoundary.tsx` | React error boundary isolating component failures. | Graceful UI fallback with retry mechanism. |

---

## 2. Refactoring & Evolution Change Log (BO-0002)

1. **Workstream B & C (Hero & Trust Layer)**:
   - Added `TrustLayer.tsx` detailing Quality Gate QG0-QG6 certification, Master Genome DNA, and Executive Decision Registry (EDR).
   - Refactored `Hero.tsx` to communicate core value within 5 seconds (*"We Manufacture Enterprise Operating Systems"*).

2. **Workstream D (Product Cards)**:
   - Refactored `ProductCard.tsx` to explicitly answer: *What is it? Why does it matter? Who is it for? Why should I trust it?*

3. **Workstream E & G (Motion & Accessibility)**:
   - Added `useReducedMotion.ts` hook for accessible animation preference checking.
   - Added `useScrollPosition.ts` hook for smooth scroll-aware navbar backdrop blur.
   - Enforced 2px Electric Cyan focus rings (`focus:ring-2 focus:ring-cyan-500`) across all interactive buttons and links.

4. **Workstream O & I (Security, Error Boundary & SEO)**:
   - Created `ErrorBoundary.tsx` for graceful failure handling.
   - Enhanced `layout.tsx` with JSON-LD Schema.org structured data, OpenGraph images, and Twitter Card tags.

---

## 3. Reserved Architecture & Remaining Backlog (V2+ Scope)

The following expansion modules are reserved in code architecture but intentionally deferred from v1.0 / RC1 public release:
- `v2/academy`: Evolvith Academy course LMS.
- `v2/docs`: Documentation Quad interactive portal.
- `v2/community`: VIP Member Forum.
- `v2/saas`: Cloud Console & Subdomain Routing (`app.evolvith.com`).

---

## 4. Risks & Future Recommendations

- **Risk**: High initial traffic spikes during public announcement.  
  *Mitigation*: Pre-render static HTML via SSG/ISR on Vercel Enterprise Edge Network for sub-50ms TTFB.
- **Recommendation**: Integrate PostHog privacy-first telemetry once Vercel production deployment URL is live.

---

*Evolvith Launch Platform RC1 Architecture Notes v1.0.0-RC1 — Authoritative.*
