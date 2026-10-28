# Top G Global — cinematic hero review

This isolated branch implements **only the hero** and the transition into a chapter placeholder. It is not a complete eight-page website. It was created directly through the GitHub integration because downloadable ZIP links failed.

Run in PowerShell:

```powershell
npm install
npm run typecheck
npm run build
npm run dev
```

Visit http://localhost:3001.

The shader uses deforming toroidal WebGL particles; responsive particle counts, pointer input, scroll response, reduced motion, visibility pausing and a 2D fallback are included.

**Pending:** The original approved metallic Top G logo was shared in ChatGPT but has not been transferred into this GitHub branch. The text-only brand name in the header is **temporary**, not a replacement approved logo. The owner can upload the original image later under `public/brand` and we'll integrate it. The project is a review build; no production or GPU validation is claimed yet.

Do not merge into `main` or `rebuild/topg-2026` until approved. No membership backend or other routes have been modified.
