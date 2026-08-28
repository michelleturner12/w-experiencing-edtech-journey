import Papa from "papaparse";

export function parseCSV<T extends Record<string, string>>(text: string): T[] {
  const result = Papa.parse<T>(text, {
    header: true,
    skipEmptyLines: "greedy",
    transformHeader: (header) => header.trim(),
    transform: (value) => value.trim(),
  });

  if (result.errors.length > 0) {
    console.warn("CSV parsing warnings:", result.errors);
  }

  return result.data.filter((row) =>
    Object.values(row).some((value) => String(value ?? "").trim() !== "")
  );
}