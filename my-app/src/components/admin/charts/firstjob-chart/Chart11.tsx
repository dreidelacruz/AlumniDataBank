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

function Chart11({ selectedYear }: any) {
  const [chartYearFindFJ, setChartYearFindFJ] = useState<any[]>([]);

  useEffect(() => {
    axios
      .get("https://localhost:5001/api/Year")
      .then((response: any) => {
        setChartYearFindFJ(response.data);
      })
      .catch((error: any) => {
        console.error(error);
      });
  }, []);

  if (!selectedYear) {
    return null;
  }

  const filteredYearData = chartYearFindFJ.find(
    (yearData) => yearData.graduatedSchoolYear === selectedYear
  );

  if (!filteredYearData) {
    return null;
  }

  const findFJs = [
    "toAnAdvertisement",
    "asWalkInApplicant",
    "recommendedBySomeone",
    "informationFromFriends",
    "arrangedByTheSchool",
    "familyBusiness",
    "jobFairForPeso",
    "other",
  ];

  const findFJData = findFJs.map(
    (findFJ) => filteredYearData.firstJobDetail.findFirstJob[findFJ]
  );
  const total = findFJData.reduce((acc, val) => acc + val, 0);
  const findFJPercentages = findFJData.map((data) =>
    ((data / total) * 100).toFixed(2)
  );
  return (
    <Grid container justifyContent="center" alignItems="center">
      <Box>
        <Bar
          data={{
            labels: [
              "To an Advertisement",
              "As a Walk-in Applicant",
              "Recommended by Someone",
              "Information from Friends",
              "Arranged by the School",
              "Family Business",
              "Job Fair for Peso",
              "Others",
            ],
            datasets: [
              {
                label: "Frequency",
                data: findFJData,
                backgroundColor: [
                  "rgba(255, 99, 132, 0.2)",
                  "rgba(255, 159, 64, 0.2)",
                  "rgba(255, 205, 86, 0.2)",
                  "rgba(75, 192, 192, 0.2)",
                  "rgba(153, 102, 255, 0.2)",
                  "rgba(255, 159, 64, 0.2)",
                  "rgba(54, 162, 235, 0.2)",
                  "rgba(201, 203, 207, 0.2)",
                ],
                borderColor: [
                  "rgb(255, 99, 132)",
                  "rgb(255, 159, 64)",
                  "rgb(255, 205, 86)",
                  "rgb(75, 192, 192)",
                  "rgb(153, 102, 255)",
                  "rgb(255, 159, 64)",
                  "rgb(54, 162, 235)",
                  "rgb(201, 203, 207)",
                ],
                borderWidth: 1,
              },
              {
                label: "Percentage",
                data: findFJPercentages,
                backgroundColor: [
                  "rgba(255, 99, 132, 0.2)",
                  "rgba(255, 159, 64, 0.2)",
                  "rgba(255, 205, 86, 0.2)",
                  "rgba(75, 192, 192, 0.2)",
                  "rgba(153, 102, 255, 0.2)",
                  "rgba(255, 159, 64, 0.2)",
                  "rgba(54, 162, 235, 0.2)",
                  "rgba(201, 203, 207, 0.2)",
                ],
                borderColor: [
                  "rgb(255, 99, 132)",
                  "rgb(255, 159, 64)",
                  "rgb(255, 205, 86)",
                  "rgb(75, 192, 192)",
                  "rgb(153, 102, 255)",
                  "rgb(255, 159, 64)",
                  "rgb(54, 162, 235)",
                  "rgb(201, 203, 207)",
                ],
                borderWidth: 1,
              },
            ],
          }}
          options={{
            indexAxis: "y",
            maintainAspectRatio: true,
            responsive: true,
            aspectRatio: 0.8,
            scales: {
              x: {
                beginAtZero: true,
              },
            },
          }}
        />
      </Box>
    </Grid>
  );
}

export default Chart11;
