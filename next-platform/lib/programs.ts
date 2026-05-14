import { ProgramLevel } from "@prisma/client";
import { db } from "@/lib/db";

export async function getProgramsByLevel(level: ProgramLevel) {
  return db.program.findMany({
    where: { level, isActive: true },
    orderBy: [{ sortOrder: "asc" }, { name: "asc" }]
  });
}

export async function getProgramBySlug(level: ProgramLevel, slug: string) {
  return db.program.findUnique({
    where: { level_slug: { level, slug } }
  });
}

export async function getProgramByLegacySlug(slug: string) {
  return db.program.findFirst({
    where: {
      slug,
      level: ProgramLevel.grado,
      isActive: true
    }
  });
}
