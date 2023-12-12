import { LineGraphType } from "@/app/question-two/RealTimeData";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
);

type Props = {
  labels: string[];
  data: number[];
  label: string;
  title: string;
  borderColor: string;
  backgroundColor: string;
};

const LineChart = ({
  labels,
  data,
  label,
  title,
  borderColor,
  backgroundColor,
}: Props) => {
  return (
    <Line
      options={{
        responsive: true,
        plugins: {
          legend: {
            position: "bottom" as const,
          },
          title: {
            display: true,
            text: title,
          },
        },
      }}
      data={{
        labels: labels.slice(-8),
        datasets: [
          {
            label,
            data: data.slice(-8),
            borderColor,
            backgroundColor,
          },
        ],
      }}
    />
  );
};

export default LineChart;
