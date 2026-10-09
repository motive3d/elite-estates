# Verification report

**Project:** ÉLITE ESTATES — Signature Edition  
**Date:** 10 October 2026 (Africa/Cairo)  
**Delivery target:** `https://USERNAME.github.io/elite-estates/`

## Build and source checks — passed

- Performed a clean `npm ci` using the supplied lockfile, followed by `npm run build` on Windows with Node 24.20.0. The final production build succeeded: 2,165 modules transformed, with no unresolved imports or build errors.
- The dependency audit returned zero known vulnerabilities during that installation. This is the observed result at verification time, not a guarantee against future disclosures.
- Confirmed the lockfile matches package.json dependencies and devDependencies.
- Confirmed Vite base is `/elite-estates/` and the React entry uses HashRouter.
- Parsed `.github/workflows/deploy.yml` with a YAML parser. Checked push/manual triggers, Pages and OIDC permissions, Node setup, `npm ci`, build command, `dist` artifact path, deployment job dependency, and `github-pages` environment. Compared the Pages action configuration with GitHub’s official documentation.
- Verified every bundled photograph, static model preview, fallback SVG, and both local WOFF2 font signatures. Reviewed photo subjects and license attributions.

The first build encountered a restricted Windows realpath error; Vite’s `preserveSymlinks` setting resolved it. A later clean install initially found the preview server holding esbuild open; stopping the preview server allowed the clean install and build to complete. These were resolved local execution issues.

## Production browser checks — passed

Tested the actual production build through a local HTTP preview using Chrome 155.0.8059.39 with Playwright. No development server substitutions or simulated property APIs were used.

### Browsing and routing

- Homepage search combines location, property type, and maximum price correctly.
- All six fictional residences appear after clearing filters.
- Ascending price, descending price, and largest-area sorting.
- Empty results, filter reset, and invalid minimum/maximum range feedback.
- All six property-detail URLs load correctly and survive direct hash-route reloads.
- Gallery view changes, expanded dialog, arrow-key navigation, and Escape dismissal.
- Unknown-route fallback.
- Mobile menu opens, navigates, and closes after a route change.
- Destination links filter the collection; property cards open the expected detail route.
- Desktop navigation links open Home, About, and Contact.

### Contact form

- Required fields and invalid email prevent draft creation.
- Property inquiry links preselect the correct residence.
- Valid submission creates an explicitly labeled local draft and makes no network submission.
- The download action creates a valid text payload containing the supplied values and the “no message sent” disclosure.
- The readable draft can be expanded, selected, and copied, and fits a 320px viewport.

**Download-save limitation:** the automated Chrome environment canceled saving the form’s text download to disk. Its download event and full text payload were checked successfully, but a completed browser-to-disk download is not claimed. The readable/selectable draft is a tested alternative. This limitation concerns the website’s inquiry-text download, not the delivered project ZIP, which was created and checked directly on disk.

### Real 3D villa

- No 3D JavaScript chunk is requested on initial homepage load.
- Choosing Explore in 3D loads the Three.js scene and creates a real WebGL canvas.
- Toolbar rotation changes the rendered image.
- Camera reset returns to the original view, checked by pixel comparison allowing small antialiasing differences.
- Zoom controls and mouse-wheel zoom change the rendered view.
- Mouse drag rotates the model.
- Day/night lighting changes the render and restores correctly.
- All four projected hotspots are clickable and update the corresponding architectural description.
- Keyboard rotation, Home reset, and Escape pause.
- Closing the viewer removes the canvas and returns to the local static preview.
- Emulated one-finger touch rotates the model; emulated two-finger pinch changes zoom.
- With controls paused, a touch swipe over the viewer scrolls the page naturally.
- Reduced-motion mode keeps content visible.
- Intentional WebGL context loss displays the recovery state.

Browser testing exposed and resolved a mobile control’s missing accessible name, a fragile HTML hotspot mount/unmount behavior, and the canvas wrapper’s default touch-action scroll trap. All related checks passed after correction.

### Responsive layouts and assets

Checked Home, Properties, a full property-detail page, About, and Contact at **320, 375, 390, 768, 1440, and 1920 CSS pixels** (30 page/viewport combinations). Each had no document-width overflow and no broken images. The primary suite recorded 147 HTTP requests with zero failed responses and no uncaught JavaScript or console errors. Final targeted checks covered the copyable draft, accessible gallery name, destination/card links, and desktop navigation.

Desktop and mobile screenshots were visually inspected, including the hero, property collection, villa daylight/evening render, philosophy section, and destinations.

## Performance choices verified in the implementation

- Local WebP photographs are 1600px wide and individually below 1 MB.
- The initial application JS is approximately 143 KB gzipped; the separate 3D chunk is approximately 252 KB gzipped and loads only on request.
- Shared 3D materials, lightweight primitives, capped/adaptive pixel density, demand rendering, no postprocessing, and no real-time shadows.
- Local fonts and imagery: no remote media/CDN dependency at runtime.

These are implementation/build observations. No physical-device FPS or Lighthouse score is claimed.

## Delivery package

The ZIP is assembled from source and local assets, preserving the hidden `.github` directory. `node_modules`, `dist`, temporary files, test scripts, screenshots, and development logs are excluded. Archive verification checks required entries, CRC integrity, file size limits, and byte-for-byte agreement with the packaged source files.

## What has not been verified

- A GitHub-hosted Actions execution and live Pages URL on your account. Those require your manual upload and Pages configuration. Workflow review and local build success do not substitute for a hosted deployment.
- Physical iPhone/Android hardware, Safari/WebKit, Firefox, or every GPU. Mobile touch checks used Chrome device emulation; WebGL tests ran in the available desktop browser environment.
- A successful browser-to-disk save of the contact draft, as explained above.
- Real contact delivery: intentionally unavailable. There is no backend, live agency, monitored inbox, or success-delivery simulation.
- Property authenticity: intentionally fictional. Galleries use one distinct licensed photograph per listing plus two clearly labeled crops, not additional authentic room photographs.
- Independent social previews for hash-routed detail pages. Browser metadata updates; non-JavaScript crawlers receive the initial homepage metadata. See README for optional absolute Open Graph image configuration after deployment.
