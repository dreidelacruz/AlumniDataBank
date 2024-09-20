import { useEffect, useState } from "react";
import axios from "axios";
import { Box, Grid } from "@mui/material";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function Chart2({ selectedYear }: any) {
  const [chartYearCourse, setChartYearCourse] = useState<any[]>([]);

  useEffect(() => {
    axios
      .get("https://localhost:5001/api/Year")
      .then((response: any) => {
        setChartYearCourse(response.data);
      })
      .catch((error: any) => {
        console.error(error);
      });
  }, []);

  if (!selectedYear) {
    return null;
  }

  const filteredYearData = chartYearCourse.find(
    (yearData) => yearData.graduatedSchoolYear === selectedYear
  );

  if (!filteredYearData) {
    return null;
  }

  const bsitData = filteredYearData.course.bsit;
  const bscsData = filteredYearData.course.bscs;
  const actData = filteredYearData.course.act;

  const total = bsitData + bscsData + actData;

  const bsitPercentage = ((bsitData / total) * 100).toFixed(2);
  const bscsPercentage = ((bscsData / total) * 100).toFixed(2);
  const actPercentage = ((actData / total) * 100).toFixed(2);

  return (
    <Grid container justifyContent="center" alignItems="center">
      <Box sx={{ height: 350, p:2 }}>
        <Bar
          data={{
            labels: ["BSIT"],
            datasets: [
              {
                label: "Frequency",
                data: [bsitData ],
                backgroundColor: [
                  "rgba(255, 99, 132, 0.2)",
                  "rgba(255, 159, 64, 0.2)",
                  "rgba(255, 205, 86, 0.2)",
                ],
                borderColor: [
                  "rgb(255, 99, 132)",
                  "rgb(255, 159, 64)",
                  "rgb(255, 205, 86)",
                ],
                borderWidth: 1,
              },
              {
                label: "Percentage",
                data: [bsitPercentage, bscsPercentage, actPercentage],
                backgroundColor: [
                  "rgba(54, 162, 235, 0.2)",
                  "rgba(153, 102, 255, 0.2)",
                  "rgba(201, 203, 207, 0.2)",
                ],
                borderColor: [
                  "rgb(75, , 192)",
                  "rgb(54, 162, 235)",
                  "rgb(153, 102, 255)",
                ],
                borderWidth: 1,
              },
            ],
          }}
          options={{
            maintainAspectRatio: true,
            responsive: true,
            aspectRatio: 1,
            scales: {
              y: {
                beginAtZero: true,
              },
            },
          }}
        />
      </Box>
    </Grid>
  );
}

export default Chart2;
