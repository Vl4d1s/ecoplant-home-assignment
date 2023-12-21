import Table from "@/components/Table";
import { getMeasurement } from "@/services/measurement-service";

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
