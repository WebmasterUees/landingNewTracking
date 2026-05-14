import fs from "node:fs/promises";
import path from "node:path";
import { parse } from "csv-parse/sync";
import { PrismaClient, ProgramLevel } from "@prisma/client";

const prisma = new PrismaClient();

type CsvRow = {
  PATH: string;
  PROGRAMA: string;
  RESOLUCION: string;
  IMAGEN_FONDO: string;
  TITULO_A_OBTENER: string;
  DOBLE_TITULACION: string;
  DESCRIPCION: string;
  META_DESCRIPCION: string;
  MODALIDAD: string;
  TIPO: string;
  DURACION: string;
  URL_SITIOWEB: string;
  URL_BROCHURE: string;
  PIXEL_GTM: string;
  title: string;
};

function trim(v?: string) {
  return (v ?? "").trim();
}

async function loadCsv(filePath: string): Promise<CsvRow[]> {
  const csv = await fs.readFile(filePath, "utf8");
  return parse(csv, {
    bom: true,
    columns: true,
    skip_empty_lines: true
  }) as CsvRow[];
}

async function upsertRows(level: ProgramLevel, rows: CsvRow[]) {
  for (let i = 0; i < rows.length; i += 1) {
    const row = rows[i];
    const slug = trim(row.PATH).toLowerCase();
    if (!slug) continue;

    await prisma.program.upsert({
      where: { level_slug: { level, slug } },
      update: {
        name: trim(row.PROGRAMA),
        resolution: trim(row.RESOLUCION) || null,
        backgroundImage: trim(row.IMAGEN_FONDO) || null,
        degreeTitle: trim(row.TITULO_A_OBTENER) || null,
        doubleDegree: trim(row.DOBLE_TITULACION) || null,
        description: trim(row.DESCRIPCION) || null,
        metaDescription: trim(row.META_DESCRIPCION) || null,
        modality: trim(row.MODALIDAD) || null,
        duration: trim(row.DURACION) || null,
        websiteUrl: trim(row.URL_SITIOWEB) || null,
        brochureUrl: trim(row.URL_BROCHURE) || null,
        gtmPixel: trim(row.PIXEL_GTM) || null,
        headingTitle: trim(row.title) || null,
        isActive: true,
        sortOrder: i + 1
      },
      create: {
        level,
        slug,
        name: trim(row.PROGRAMA),
        resolution: trim(row.RESOLUCION) || null,
        backgroundImage: trim(row.IMAGEN_FONDO) || null,
        degreeTitle: trim(row.TITULO_A_OBTENER) || null,
        doubleDegree: trim(row.DOBLE_TITULACION) || null,
        description: trim(row.DESCRIPCION) || null,
        metaDescription: trim(row.META_DESCRIPCION) || null,
        modality: trim(row.MODALIDAD) || null,
        duration: trim(row.DURACION) || null,
        websiteUrl: trim(row.URL_SITIOWEB) || null,
        brochureUrl: trim(row.URL_BROCHURE) || null,
        gtmPixel: trim(row.PIXEL_GTM) || null,
        headingTitle: trim(row.title) || null,
        isActive: true,
        sortOrder: i + 1
      }
    });
  }
}

async function main() {
  const repoRoot = path.resolve(process.cwd(), "..");
  const gradoPath = path.join(repoRoot, "programas-CSV", "programas-grado.csv");
  const postgradoPath = path.join(repoRoot, "programas-CSV", "programas-postgrado.csv");

  const [gradoRows, postgradoRows] = await Promise.all([loadCsv(gradoPath), loadCsv(postgradoPath)]);

  await upsertRows(ProgramLevel.grado, gradoRows);
  await upsertRows(ProgramLevel.postgrado, postgradoRows);

  console.log(`Seed completado: ${gradoRows.length} grado, ${postgradoRows.length} postgrado.`);
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
