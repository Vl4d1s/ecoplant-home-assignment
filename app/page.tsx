import Table from "@/components/Table";
import { Measurement } from "@/types";

export async function getMeasurement(): Promise<Measurement[]> {
  const res = await fetch("http://localhost:3000/api/measurements");
  const { data } = await res.json();
  return data;
}

export default async function Home() {
  const data = await getMeasurement();
  return (
    <main>
      <h3 className="font-bold text-center text-gradient mt-10 mb-5">
        Ecoplant Home Assignment
      </h3>
      <Table data={data} />;
    </main>
  );
}
