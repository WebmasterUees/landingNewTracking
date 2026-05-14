# AGENTS

## Project Context

- This repo is a static multi-landing site under `/var/www/informacion`.
- Current structure groups program pages by academic level:
  - `grado/`
  - `postgrado/`
  - `programas-CSV/`
  - shared assets/scripts under `css/` and `js/`
- Current landing pages hydrate content from CSV using `/informacion/js/script.js`.
- Current CSV files are:
  - `/informacion/programas-CSV/programas-grado.csv`
  - `/informacion/programas-CSV/programas-postgrado.csv`

## Known Bug Reference

- Legacy public grado URLs such as `/informacion/derecho/` used to be indexed and receive traffic.
- The current file structure moved those pages under `/informacion/grado/<slug>/`.
- The legacy URLs currently resolve to 404 in production, which risks SEO, Analytics, campaign links, and user traffic.
- The selected fix is an internal Nginx rewrite so legacy URLs remain visible while serving files from `/informacion/grado/<slug>/` internally.

## Execution Plan

- Do not implement this from memory.
- Read and follow the full executable plan in:

```txt
./PLAN-nginx-legacy-url-rewrite-2026-05-09.md
```

## Important Constraints

- Do not use `.htaccess`; the intended server is Nginx.
- Do not use visible `301`/`302` redirects unless stakeholders explicitly accept moving indexed URLs to `/informacion/grado/<slug>/`.
- Run `nginx -t` before any Nginx reload.
- Do not reload Nginx if config validation fails.
- Preserve current working routes under `/informacion/grado/`, `/informacion/postgrado/`, `/informacion/programas-CSV/`, `/informacion/js/`, and `/informacion/css/`.
