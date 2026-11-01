# Publicación del Worker

## CI: calidad y artefacto de revisión

`.github/workflows/quality-artifact.yml` ejecuta las pruebas y el lint en pull requests, en pushes a `main` y bajo `workflow_dispatch`. El workflow no recibe credenciales Cloudflare, no llama a Wrangler para publicar y no modifica la cuenta Cloudflare.

El artefacto `worker-review-<sha>` contiene:

- `source-sha.txt`, con el commit exacto revisado por CI.
- `worker-source.tar.gz`, con la configuración del Worker, el entry point y los assets permitidos.
- `worker-source.tar.gz.sha256`, para comprobar que el paquete descargado no cambió.

El paquete usa una lista explícita de rutas públicas junto con `.assetsignore`; no incluye documentación, dependencias, historiales, `.env` ni otros archivos del checkout.

## Publicación: fuera de GitHub Actions

La publicación en producción es una operación manual de Root, después de revisar el commit y el checksum exactos del artefacto. Las credenciales viven solo en el entorno confiable del publicador Root, fuera de GitHub Actions y del repositorio. No se debe restaurar un token Cloudflare como secreto de GitHub Actions ni asociar una publicación automática a `push`, `pull_request` o `workflow_dispatch`.

Antes de publicar, Root verifica que:

1. El artefacto corresponde al commit aprobado y su checksum coincide.
2. El archivo contiene únicamente las rutas esperadas y `.assetsignore` conserva su allowlist.
3. La revisión del código cubre `src/index.js`, `wrangler.toml`, HTML y assets de ese mismo commit.
4. Existe autorización de Root para la publicación concreta.

El repositorio solo genera el artefacto de revisión; este documento no ejecuta ni autoriza una mutación en Cloudflare.

## Desarrollo y validación local

```bash
npm install
node --test tests/*.mjs
npm run lint
npm run dev
```

`wrangler.toml` define el Worker y el binding de assets. `.assetsignore` debe seguir permitiendo solo los archivos públicos del sitio.
