import Table from "@/components/Table/Table";
import { Measurement } from "@/types";

async function getMeasurement(): Promise<Measurement[]> {
  const res = await fetch("http://localhost:3000/api/measurements");
  const { data } = await res.json();
  return data;
}

export default async function Home() {
  const data = await getMeasurement();
  return (
    <main>
      <h3 className="font-bold text-center text-gradient mt-10 mb-5">
        Ecoplant Measurement Table
      </h3>
      <Table data={data} />;
    </main>
  );
}
