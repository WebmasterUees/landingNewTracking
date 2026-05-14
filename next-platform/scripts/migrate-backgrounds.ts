import fs from "node:fs/promises";
import path from "node:path";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function ensureDir(dir: string) {
  await fs.mkdir(dir, { recursive: true });
}

async function fileExists(filePath: string) {
  try {
    await fs.access(filePath);
    return true;
  } catch {
    return false;
  }
}

function extFromSource(filePath: string) {
  const ext = path.extname(filePath).toLowerCase();
  if (ext === ".jpg" || ext === ".jpeg" || ext === ".png" || ext === ".webp") return ext;
  return ".jpg";
}

async function main() {
  const repoRoot = path.resolve(process.cwd(), "..");
  const publicBase = path.resolve(process.cwd(), "public", "assets", "backgrounds");
  await ensureDir(publicBase);

  const programs = await prisma.program.findMany({
    where: { isActive: true },
    orderBy: [{ level: "asc" }, { slug: "asc" }]
  });

  let copied = 0;
  let skipped = 0;
  let missing = 0;

  for (const program of programs) {
    const original = (program.backgroundImage || "").trim();
    if (!original) {
      missing += 1;
      continue;
    }

    const relativeSource = original.replace(/^\//, "");
    const candidatePaths = [
      path.resolve(repoRoot, relativeSource.replace(/^informacion\//, "")),
      path.resolve(process.cwd(), "public", relativeSource)
    ];

    let sourcePath = candidatePaths[0];
    let exists = false;
    for (const candidate of candidatePaths) {
      if (await fileExists(candidate)) {
        sourcePath = candidate;
        exists = true;
        break;
      }
    }
    if (!exists) {
      missing += 1;
      continue;
    }

    const ext = extFromSource(sourcePath);
    const levelFolder = path.join(publicBase, program.level);
    await ensureDir(levelFolder);
    const fileName = `${program.slug}${ext}`;
    const targetPath = path.join(levelFolder, fileName);
    const publicPath = `/assets/backgrounds/${program.level}/${fileName}`;

    const alreadyExists = await fileExists(targetPath);
    if (!alreadyExists) {
      await fs.copyFile(sourcePath, targetPath);
      copied += 1;
    } else {
      skipped += 1;
    }

    await prisma.program.update({
      where: { id: program.id },
      data: { backgroundImage: publicPath }
    });
  }

  console.log(`Background migration done. copied=${copied}, skipped=${skipped}, missing=${missing}`);
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
