import axios from "axios";
import  { useEffect, useState } from "react";
import {  Pie } from "react-chartjs-2";
import { Chart, ArcElement } from "chart.js";
import { Box, Grid } from "@mui/material";
Chart.register(ArcElement);

function Chart16({selectedYear}: any) {
    const [chartYearEducRelated, setChartYearEducRelated] = useState<any[]>([]);

    useEffect(() => {
      axios
        .get("https://localhost:5001/api/Year")
        .then((response) => {
          setChartYearEducRelated(response.data);
        })
        .catch((error) => {
          console.error(error);
        });
    }, []);
  
    if (!selectedYear) {
      return null;
    }
  
    const filteredYearData = chartYearEducRelated.find(
      (yearData) => yearData.graduatedSchoolYear === selectedYear
    );
  
    if (!filteredYearData) {
      return null;
    }
  
    const yesData = filteredYearData.educationalDetail.presentJobRelatedCourse.yes;
    const noData = filteredYearData.educationalDetail.presentJobRelatedCourse.no;
  
    return (
      <Grid container justifyContent="center" alignItems="center">
        <Box sx={{height: 350, p:2}}>
          <Pie
            data={{
              labels: ["Yes", "No"],
              datasets: [
                {
                  data: [yesData, noData],
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
              ],
            }}
            options={{
              maintainAspectRatio: true,
              responsive: true,
              aspectRatio: 1,
            }}
          />
        </Box>
      </Grid>
    );
  }

export default Chart16