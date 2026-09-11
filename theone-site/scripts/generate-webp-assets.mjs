import { mkdir, readdir } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const sourceRoot = path.resolve("assets-source");
const outputRoot = path.resolve("src/assets");
const imageExtensions = new Set([".jpg", ".jpeg", ".png"]);
const excludedDirectories = new Set(["fonts", "earth"]);
const excludedFiles = new Set(["logo.png", "logo2.png"]);

function getTransformOptions(sourceFile) {
  const normalizedPath = sourceFile.split(path.sep).join("/");

  if (normalizedPath.includes("/gallery/thumbs/")) {
    return {
      maxWidth: 520,
      quality: 74,
    };
  }

  if (normalizedPath.includes("/earth/")) {
    return {
      maxWidth: 1024,
      quality: 80,
    };
  }

  if (normalizedPath.includes("/gallery/")) {
    return {
      maxWidth: 1280,
      quality: 78,
    };
  }

  return {
    maxWidth: 1200,
    quality: 78,
  };
}

async function collectImages(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const entryPath = path.join(directory, entry.name);

    if (entry.isDirectory()) {
      if (!excludedDirectories.has(entry.name)) {
        files.push(...(await collectImages(entryPath)));
      }
      continue;
    }

    const ext = path.extname(entry.name).toLowerCase();
    if (imageExtensions.has(ext) && !excludedFiles.has(entry.name)) {
      files.push(entryPath);
    }
  }

  return files;
}

const sourceFiles = await collectImages(sourceRoot);

await Promise.all(
  sourceFiles.map(async (sourceFile) => {
    const parsed = path.parse(sourceFile);
    const relativeDir = path.relative(sourceRoot, parsed.dir);
    const outputFile = path.join(outputRoot, relativeDir, `${parsed.name}.webp`);
    const { maxWidth, quality } = getTransformOptions(sourceFile);

    await mkdir(path.dirname(outputFile), { recursive: true });
    await sharp(sourceFile)
      .rotate()
      .resize({
        width: maxWidth,
        withoutEnlargement: true,
      })
      .webp({
        quality,
        effort: 5,
      })
      .toFile(outputFile);
  }),
);

console.log(`[images] Generated ${sourceFiles.length} WebP assets.`);
