import * as fs from "fs/promises";
import { createReadStream } from "fs";
import * as path from "path";
import csvParser from "csv-parser";
import archiver from "archiver";

interface CSVRow {
  gender: string;
  [key: string]: string;
}

export async function processCSV(filePath: string): Promise<Buffer> {
  const males: CSVRow[] = [];
  const females: CSVRow[] = [];

  const tempDir = path.join(__dirname, "../upload");
  await fs.mkdir(tempDir, { recursive: true });

  const malesPath = path.join(tempDir, "males.csv");
  const femalesPath = path.join(tempDir, "females.csv");

  // Parse CSV and split rows by gender
  await new Promise<void>((resolve, reject) => {
    createReadStream(filePath)
      .pipe(csvParser())
      .on("data", (row: CSVRow) => {
        if (row.gender?.toLowerCase() === "male") males.push(row);
        else if (row.gender?.toLowerCase() === "female") females.push(row);
      })
      .on("end", resolve)
      .on("error", reject);
  });

  const writeCSV = async (data: CSVRow[], outputPath: string) => {
    if (data.length === 0) return;

    const headers = Object.keys(data[0]).join(",") + "\n";
    const rows = data
      .map((row) =>
        Object.values(row)
          .map((value) => `"${String(value).replace(/"/g, '""')}"`)
          .join(",")
      )
      .join("\n");

    await fs.writeFile(outputPath, headers + rows);
  };

  await Promise.all([
    writeCSV(males, malesPath),
    writeCSV(females, femalesPath),
  ]);

  const zipBuffer = await new Promise<Buffer>((resolve, reject) => {
    const chunks: Buffer[] = [];
    const archive = archiver("zip", { zlib: { level: 9 } });

    archive.on("data", (chunk) => chunks.push(chunk));
    archive.on("error", reject);
    archive.on("end", () => resolve(Buffer.concat(chunks)));

    if (males.length > 0) archive.file(malesPath, { name: "males.csv" });
    if (females.length > 0) archive.file(femalesPath, { name: "females.csv" });
    archive.finalize();
  });

  await Promise.all([
    fs.unlink(filePath),
    fs.unlink(malesPath).catch(() => undefined),
    fs.unlink(femalesPath).catch(() => undefined),
  ]);

  return zipBuffer;
}
