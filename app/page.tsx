import Table from "@/components/Table";
import { Measurement } from "@/types";

export async function getMeasurement(): Promise<Measurement[]> {
  const res = await fetch("http://localhost:3000/api/measurements");
  return res.json();
}

export default async function Home() {
  const data = await getMeasurement();
  return <Table data={data} />;
}
