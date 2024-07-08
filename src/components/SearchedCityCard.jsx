import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Box,
  Grid,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { Doughnut } from "react-chartjs-2";
import { Today, Waves, Opacity, BeachAccess } from "@mui/icons-material";
import {
  Chart as ChartJS,
  ArcElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  ArcElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const gradientPlugin = {
  id: "customGradient",
  beforeDraw: (chart) => {
    const {
      ctx,
      chartArea: { left, right, top, bottom },
    } = chart;
    const gradient = ctx.createLinearGradient(left, top, right, bottom);
    gradient.addColorStop(0, "rgba(0, 0, 0, 0.7)");
    gradient.addColorStop(1, "rgba(0, 0, 255, 0.7)");

    chart.data.datasets.forEach((dataset) => {
      dataset.backgroundColor = gradient;
    });
  },
};

const SearchedCityCard = ({ city, data }) => {
  const { main, weather, wind } = data;

  const currentDate = new Date();

  const dayNames = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const dayName = dayNames[currentDate.getDay()];

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down(600));
  const isVerySmallScreen = useMediaQuery(theme.breakpoints.down(390));

  const cardStyle = {
    backgroundSize: "cover",
    minHeight: "200px",
    display: "flex",
    flexDirection: isSmallScreen ? "column" : "row",
    justifyContent: "space-between",
    alignItems: "center",
    textAlign: "left",
    padding: "30px",
    color: "#F5FEFD",
    borderRadius: "12px",
    backgroundColor: "transparent",
  };

  const infoStyle = {
    display: "flex",
    alignItems: "center",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
    marginBottom: "16px",
    textAlign: "center",
  };

  const chartData = {
    labels: ["Wind Speed", "Humidity", "Temperature"],
    datasets: [
      {
        data: [wind.speed, main.humidity, main.temp],
        backgroundColor: [
          "rgba(0, 0, 0, 0.6)",
          "rgba(0, 0, 0, 0.8)",
          "rgba(0, 0, 0, 1)",
        ],
        borderColor: [
          "rgba(0, 0, 0, 1)",
          "rgba(0, 0, 0, 1)",
          "rgba(0, 0, 0, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    plugins: {
      legend: {
        display: true,
        position: "bottom",
        labels: {
          boxWidth: 10,
          padding: 10,
          color: "black",
        },
      },
    },
  };

  const chartStyle = {
    width: isVerySmallScreen ? "175px" : "200px",
    height: isVerySmallScreen ? "175px" : "200px",
    margin: "auto",
  };

  return (
    <Card style={cardStyle}>
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={12} sm={6} md={4}>
          <Box
            style={{
              display: "flex",
              flexDirection: "column",
              backgroundColor: "transparent",
              padding: "20px",
              height: "100%",
              alignItems: isSmallScreen ? "center" : "flex-start",
              textAlign: isSmallScreen ? "center" : "left",
            }}
          >
            <Typography variant="h4" noWrap>
              {city}
            </Typography>
            <Typography variant="subtitle1" style={infoStyle}>
              <Today fontSize="small" /> {dayName},{" "}
              {currentDate.toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
              })}
            </Typography>
            <Box style={infoStyle}>
              <Typography variant="h4" noWrap>
                {main.temp} °C
              </Typography>
            </Box>
            <Box style={infoStyle}>
              <Typography variant="body1" noWrap>
                Feels Like: {main.feels_like} °C
              </Typography>
            </Box>
          </Box>
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <CardContent>
            <Typography variant="h6" align="center" gutterBottom>
              Weather Data Overview
            </Typography>
            <Box style={chartStyle}>
              <Doughnut
                data={chartData}
                options={chartOptions}
                plugins={[gradientPlugin]}
              />
            </Box>
          </CardContent>
        </Grid>

        <Grid item xs={12} sm={12} md={4}>
          <CardContent>
            <Box
              style={{
                ...infoStyle,
                flexDirection: "column",
                backgroundColor: "transparent",
                borderRadius: "12px",
                padding: "20px",
                height: "100%",
                justifyContent: "space-around",
              }}
            >
              <Box style={{ padding: "8px" }}>
                <Waves fontSize="small" />
                <Typography variant="body1" noWrap>
                  Wind Speed: {wind.speed} m/s
                </Typography>
              </Box>
              <Box style={{ padding: "8px" }}>
                <Opacity fontSize="small" />
                <Typography variant="body1" noWrap>
                  Humidity: {main.humidity}%
                </Typography>
              </Box>
              <Box style={{ padding: "8px" }}>
                <BeachAccess fontSize="small" />
                <Typography variant="body1" noWrap>
                  Weather: {weather[0].description}
                </Typography>
              </Box>
            </Box>
          </CardContent>
        </Grid>
      </Grid>
    </Card>
  );
};

export default SearchedCityCard;
