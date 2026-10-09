# Original procedural villa

The optimized model is defined in `src/components/VillaScene.jsx` and generated in the browser when the visitor chooses **Explore in 3D**.

There is no external model download, GLB dependency, texture service, environment map, API key, or decoder CDN. The procedural geometry is the model source and is bundled into the lazy-loaded 3D chunk during production build.

The scene uses primitive geometry, shared materials, low-resolution foliage, demand rendering, adaptive capped pixel density, and no real-time shadows or postprocessing. The model includes two floors, glazing, terrace balustrades, pool, loungers, plants, and lighting strips. It is an exterior architectural concept, not a measured or inhabitable interior model.

The local static fallback `public/images/villa-preview.webp` is a capture of this actual model.
