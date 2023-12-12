import NumericData from "./NumericData";

type SpectrumData = {
  velocity: number;
  altitude: number;
  temperature: number;
  statusMessage: string;
  isAscending: boolean;
  isActionRequired: boolean;
};

async function getData() {
  const res = await fetch(
    "https://webfrontendassignment-isaraerospace.azurewebsites.net/api/SpectrumStatus",
    { cache: "no-store" },
  );

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

const page = async () => {
  const data: SpectrumData = await getData();
  // const [data, setData] = useState()

  return (
    <div className="px-4">
      <NumericData
        altitude={data.altitude}
        isActionRequired={data.isActionRequired}
        isAscending={data.isAscending}
        velocity={data.velocity}
        temperature={data.temperature}
        statusMessage={data.statusMessage}
      />
    </div>
  );
};

export default page;
