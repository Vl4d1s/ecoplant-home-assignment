import { Measurement } from "@/types";
import { getDatabaseConnection } from "@/utils/database";

export async function getMeasurement(): Promise<Measurement[]> {
  const db = await getDatabaseConnection();

  const measurements: Measurement[] = await db.all(
    "SELECT * FROM measurements"
  );

  return measurements;
}
