import { useEffect, useState } from "react";
import axios from "axios";
import { Box, Grid} from "@mui/material";
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
)

function Chart10({selectedYear}: any) {
    const [chartYearLandFJ, setChartYearLandFJ] = useState<any[]>([]);

    useEffect(() => {
      axios
        .get("https://localhost:5001/api/Year")
        .then((response: any) => {
          setChartYearLandFJ(response.data);
        })
        .catch((error: any) => {
          console.error(error);
        });
    }, []);
  
    if (!selectedYear) {
      return null;
    }
  
    const filteredYearData = chartYearLandFJ.find(
      (yearData) => yearData.graduatedSchoolYear === selectedYear
    );
  
    if (!filteredYearData) {
      return null;
    }
  
    const landFJs = [
      "lessThanAMonth",
      "monthOneToThree",
      "monthFourToSix",
      "monthSevenToEleven",
      "yearOneToTwo",
      "yearTwoToThree",
      "yearThreeToFour",
      "others",
    ];
  
    const landFJData = landFJs.map(
      (landFJ) => filteredYearData.firstJobDetail.landFirstJob[landFJ]
    );
    const total = landFJData.reduce((acc, val) => acc + val, 0);
    const landFJPercentages = landFJData.map((data) =>
      ((data / total) * 100).toFixed(2)
    );
  return (
<Grid container justifyContent="center" alignItems="center">
      <Box>
      <Bar
        data={{
          labels: [
            "Less Than a Month",
            "1 to 3 Months",
            "4 to 6 Months",
            "7 to 11 Months",
            "1 to 2 Years",
            "2 to 3 Years",
            "3 to 4 Years",
            "Others"
          ],
          datasets: [
            {
              label: "Frequency",
              data: landFJData,
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
              data: landFJPercentages,
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

export default Chart10