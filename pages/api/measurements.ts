import { Measurement } from "@/types";
import type { NextApiRequest, NextApiResponse } from "next";
import { open } from "sqlite";
import { Database } from "sqlite3";

interface ResponseData {
  data: Measurement[];
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
): Promise<void> {
  const db = await open({
    filename: "./database.db",
    driver: Database,
  });

  const measurements: Measurement[] = await db.all(
    "SELECT * FROM measurements"
  );

  if (req.method === "GET") {
    res.status(200).json({ data: measurements });
  }
}
