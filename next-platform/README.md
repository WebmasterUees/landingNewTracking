# Informacion Next Platform

Plataforma de landings de UEES Online migrada a **Next.js + PostgreSQL + Prisma**.

## Estructura actual (core)

- `app/` rutas App Router
- `components/` componentes de UI y widgets
- `lib/` acceso a datos
- `prisma/` esquema y cliente
- `public/` assets publicados (fondos, css/js de landings, favicon, csv de soporte)
- `scripts/` utilitarios de importacion/migracion

Se eliminaron carpetas legacy fuera de `public/` para dejar solo la estructura core de Next.

## Stack

- Next.js 14 (App Router)
- PostgreSQL
- Prisma ORM

## Rutas publicas

Nuevas rutas principales:

- `/` redirige a `/grado`
- `/grado`
- `/grado/[slug]`
- `/postgrado`
- `/postgrado/[slug]`

Compatibilidad legacy (redirigen a nuevas rutas):

- `/informacion`
- `/informacion/grado`
- `/informacion/grado/[slug]`
- `/informacion/postgrado`
- `/informacion/postgrado/[slug]`
- `/informacion/[slug]`

## Setup rapido

```bash
npm install
npm run build
```

Para desarrollo:

```bash
npm run dev
```

## Base de datos

Comandos utiles:

```bash
npm run db:generate
npm run db:push
npm run db:seed
```

Migracion de backgrounds segun `slug`:

```bash
npm run assets:migrate-backgrounds
```

## Produccion con PM2

Desde `/var/www/informacion`:

```bash
pm2 start npm --name informacion-next -- start -- -p 3100
pm2 save
pm2 startup systemd -u root --hp /root
```

Comandos operativos:

```bash
pm2 status
pm2 logs informacion-next
pm2 restart informacion-next
```

## Notas

- El formulario externo se monta en cliente para compatibilidad con `document.currentScript`.
- El fondo de pagina en detalle de programa se aplica en `body` para mantener efecto fijo (parallax-like) igual al backup.
