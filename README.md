# ÉLITE ESTATES — Signature Edition

A complete, self-contained React/Vite portfolio website with an original interactive Three.js villa. Prepared for the GitHub repository **elite-estates**.

## Start here — Chrome and File Explorer only

You do **not** need a terminal, VS Code, GitHub Copilot, a Codex GitHub connection, Node.js on your computer, API keys, or paid hosting. GitHub Actions performs the installation and build online.

1. Download **elite-estates-complete.zip**. In Windows File Explorer, right-click the ZIP and choose **Extract All…**, then **Extract**. Open the extracted folder. You should see `index.html`, `package.json`, `src`, `public`, and `.github` together.
2. Sign into [GitHub](https://github.com) in Chrome. Choose **New repository**, name it exactly **elite-estates**, choose **Public**, select **Add a README file**, and create the repository. Public repositories support GitHub Pages on GitHub Free.
3. In the repository, open **Settings → Pages**. Under **Build and deployment → Source**, choose **GitHub Actions**. You do not need to choose a starter workflow; this project provides one.
4. Return to **Code → Add file → Upload files**. Drag the **contents** of the extracted folder into the browser. Include `src/`, `public/`, and `.github/`, plus all root files. Do not upload the ZIP itself or the enclosing folder: `package.json` must be visible directly at the repository root.
5. Wait for every file to finish uploading. Enter a commit message, such as “Add complete ÉLITE ESTATES website”, and **Commit changes** to `main`. If GitHub requires a new branch, create it, then use the browser to open and merge its pull request into `main`.
6. Verify that the repository contains **`.github/workflows/deploy.yml`**. This is essential. In File Explorer, enable **View → Show → Hidden items** if needed before uploading.
7. Open the **Actions** tab. Select **Deploy ÉLITE ESTATES to GitHub Pages** and wait for both build and deploy to show green checks. If no run starts after enabling Pages, choose this workflow → **Run workflow** → `main` → **Run workflow**. No commands are needed.
8. Open **Settings → Pages → Visit site**, or use the deployment link in the Actions run. Your URL is **https://USERNAME.github.io/elite-estates/**, replacing `USERNAME` with your actual GitHub username. A subpage looks like `https://USERNAME.github.io/elite-estates/#/properties/azure-villa`.

### If Chrome did not upload the `.github` folder

Use **Code → Add file → Create new file** in GitHub. Enter **`.github/workflows/deploy.yml`** as the filename. Open the extracted `deploy.yml` in Windows Notepad (right-click → Open with → Notepad), copy its entire content, paste into GitHub’s editor, and commit to `main`. This preserves the required workflow path without installing a development tool. You can also copy the workflow text from `START-HERE.html`, which opens directly in Chrome.

### Common setup fixes

- **Only the ZIP appears in GitHub:** extract it and upload its contents. GitHub does not automatically extract source ZIPs.
- **A nested folder contains `package.json`:** move/upload the project contents to the repository root through the browser.
- **The first action failed before Pages was enabled:** set Pages Source to GitHub Actions, then run the workflow again.
- **Missing images or blank page after renaming the repository:** this build deliberately uses `/elite-estates/`. Keep that exact repository name, or change `base` in `vite.config.js` to the new repository path through GitHub’s file editor and commit.
- **Opening `index.html` locally shows a blank page:** expected for React source. Open `START-HERE.html` for the guide; use the deployed GitHub Pages URL for the website. GitHub Actions produces the browser-ready build.
- **The URL is not ready yet:** wait for a successful deploy job and refresh the Pages settings. Repository rules or account/organization policies can require additional approval.

## What is included

- Home: cinematic hero, working search, selected residences, villa viewer, philosophy, destinations, contact CTA.
- Properties: all six specified fictional listings, combined location/type/minimum/maximum price filters, sorting, and empty states.
- Details: individual routes, specifications, amenities, neighborhood descriptions, honest stock-image galleries, related homes, prefilled inquiries.
- About: the brand concept and architectural philosophy, with a clear portfolio disclosure.
- Contact: accessible browser-validated form, property preselection, local draft creation and text download. **No message is sent.** There is no backend, fabricated agency email, phone number, or office.
- 3D: original two-level procedural villa, pool, landscaping, terrace, glazing, daytime/evening lighting, four projected hotspots, rotation, zoom, reset, keyboard controls, and touch gestures.
- Local optimized WebP imagery, local WOFF2 fonts, attribution and font licenses.
- GSAP/ScrollTrigger reveals, native scrolling, reduced-motion behavior, responsive navigation, focus states, semantic headings, titles and metadata.

## 3D controls

Choose **Explore in 3D** to download the 3D code and create the scene. Choose the hand button (**Enable controls**) to interact. Drag with a mouse or one finger to rotate. Use the mouse wheel or two-finger pinch to zoom. The toolbar also provides rotate, zoom, reset, day/night and close buttons. With the viewer region focused, use Left/Right, +/−, Home to reset, and Escape to pause.

Controls start paused so the viewer does not trap normal page scrolling. Pause again with the hand button or Escape. Scroll outside the viewer normally, even while interaction is active. Toolbar controls and the feature list provide alternatives to gestures.

The villa is generated from source in `src/components/VillaScene.jsx`. No external model binary is required. `public/models/README.md` explains the model and optimizations. Rendering uses shared materials, low-complexity primitives, no postprocessing or real-time shadows, demand rendering, capped/adaptive pixel density, and a lazy-loaded chunk. The static model image is an actual rendered capture of this scene. A WebGL error boundary and context-loss message provide recovery.

## Image and listing honesty

All six listings, names, prices, dimensions, and amenities are fictional portfolio content, not offers to sell property. Stock photographs express a design direction and were not taken at these imagined Dubai addresses. Every listing uses its own photograph consistently. Its gallery includes the full photograph and two explicitly labeled detail crops, not fabricated additional room photographs. See **ASSET-ATTRIBUTIONS.md** and the bundled OFL font licenses.

## Project structure

```text
.github/workflows/deploy.yml   GitHub Actions build and Pages deployment
index.html                    HTML entry and initial social metadata
package.json                  Dependency ranges and scripts
package-lock.json             Reproducible dependency resolution
vite.config.js                /elite-estates/ base path
src/main.jsx                  HashRouter entry
src/App.jsx                   Navigation, routing, metadata, transitions, footer
src/data/properties.js        Six property records and local asset helper
src/components/               Cards, shared UI, lazy villa and procedural model
src/pages/                    Home, collection, details, About, Contact
src/styles.css                Responsive design system and local fonts
public/images/                Optimized stock photos, model preview, fallback
public/fonts/                 Local WOFF2 fonts and OFL licenses
public/models/README.md       Procedural model documentation
public/ASSET-ATTRIBUTIONS.md   Website-accessible credits
START-HERE.html               Offline manual upload guide
QA-REPORT.md                  Tests actually performed and verification limits
```

## GitHub Pages architecture

Vite uses the base `/elite-estates/`; React Router uses **HashRouter**, so reloading or sharing detail URLs does not ask GitHub Pages for nonexistent server routes. All photography, fonts and model resources are local. There are no runtime API calls or third-party image/font CDNs.

The workflow runs on pushes to `main` or `master` and supports manual dispatch. It installs Node 22, runs `npm ci`, builds, uploads only `dist`, and deploys with Pages OIDC permissions and the `github-pages` environment. Never manually upload a `node_modules` or `dist` directory.

Per-page titles and descriptions update in the browser. Social crawlers that do not execute JavaScript see the initial homepage metadata; hash-routed subpages are not separately prerendered. After publishing, you may set the initial `og:image` in `index.html` to your absolute deployed image URL (`https://USERNAME.github.io/elite-estates/images/hero.webp`) for wider social crawler compatibility.

## Optional developer reference — not required for your upload workflow

Developers maintaining a local checkout may use Node 22.12+ (Node 22 LTS recommended):

```sh
npm ci
npm run dev
npm run build
npm run preview
```

Open the local `/elite-estates/` URL printed by Vite. `resolve.preserveSymlinks` is enabled for compatibility with restricted Windows workspaces. The source is ordinary JavaScript/React and works on GitHub’s Linux runner.

## Verification and limits

See `QA-REPORT.md` for the exact final checks. The project is not deployed on your account by this delivery. A GitHub-hosted Actions run and the final live URL can only be verified after your manual upload. Emulated mobile tests are not equivalent to tests on physical iPhones and Android devices.

## Reference documentation

- [GitHub: browser file upload](https://docs.github.com/en/repositories/working-with-files/managing-files/adding-a-file-to-a-repository)
- [GitHub: custom Pages workflows](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages)
- [Vite: deploying to GitHub Pages](https://vite.dev/guide/static-deploy#github-pages)
- [Unsplash image license](https://unsplash.com/license)
