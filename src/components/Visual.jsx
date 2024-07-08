import React from "react";
import { Line } from "react-chartjs-2";
import { Card, CardContent, useTheme, useMediaQuery } from "@mui/material";
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

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const Visual = ({ data }) => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down(600));

  const uniqueDays = [];
  const daysData = [];

  for (let i = 0; i < data.length; i++) {
    const dayName = new Date(data[i].dt_txt).toLocaleDateString("en-US", {
      weekday: "long",
    });
    if (!uniqueDays.includes(dayName)) {
      uniqueDays.push(dayName);
      daysData.push(data[i]);
    }
    if (uniqueDays.length === 6) break;
  }

  const labels = uniqueDays;
  const temps = daysData.map((item) => item.main.temp);

  const chartData = {
    labels,
    datasets: [
      {
        label: "Temperature (°C)",
        data: temps,
        fill: false,
        borderColor: "rgba(75, 192, 192, 1)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        tension: 0.1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
        labels: {
          color: "#F5FEFD",
        },
      },
      title: {
        display: true,
        text: "6 Days Temperature Forecast",
        font: {
          size: 16,
          weight: "",
        },
        color: "#F5FEFD",
      },
    },
    scales: {
      x: {
        ticks: {
          font: {
            size: 10,
          },
          color: "#F5FEFD",
        },
      },
      y: {
        ticks: {
          font: {
            size: 10,
          },
          color: "#F5FEFD",
        },
      },
    },
  };

  const smallChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: "6 Days Temperature Forecast",
        font: {
          size: 14,
          weight: "",
        },
        color: "#F5FEFD",
      },
    },
    scales: {
      x: {
        ticks: {
          font: {
            size: 10,
          },
          color: "#F5FEFD",
        },
      },
      y: {
        ticks: {
          font: {
            size: 10,
          },
          color: "#F5FEFD",
        },
      },
    },
    layout: {
      padding: {
        left: isSmallScreen ? 0 : 0,
        right: isSmallScreen ? 0 : 0,
        top: 0,
        bottom: 0,
      },
    },
  };

  const cardStyle = {
    backgroundColor: "transparent",
    minHeight: isSmallScreen ? "175px" : "230px",
    padding: "20px",
    borderRadius: "12px",
  };

  return (
    <Card style={cardStyle}>
      <CardContent>
        <div
          style={{ height: isSmallScreen ? "175px" : "230px", width: "100%" }}
        >
          <Line
            data={chartData}
            options={isSmallScreen ? smallChartOptions : chartOptions}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default Visual;
