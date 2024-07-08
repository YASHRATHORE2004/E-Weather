import React, { useState } from "react";
import { Card, CardContent, Typography, Grid, Box } from "@mui/material";

const DaysData = ({ data }) => {
  const uniqueDays = [];
  const daysData = [];

  for (let i = 0; i < data.length; i++) {
    const date = new Date(data[i].dt_txt).toLocaleDateString("en-US", {
      weekday: "short",
      year: "numeric",
      month: "numeric",
      day: "numeric",
    });

    // Include distinct days
    if (!uniqueDays.includes(date)) {
      uniqueDays.push(date);
      daysData.push(data[i]);
    }

    if (uniqueDays.length === 6) break;
  }

  const [selectedDay, setSelectedDay] = useState(null);

  const handleDayClick = (index) => {
    setSelectedDay(selectedDay === index ? null : index);
  };

  return (
    <>
      <Typography variant="h5" gutterBottom align="center" color={"#F5FEFD"}>
        Upcoming Days Weather Report
      </Typography>
      <Grid container spacing={2} justifyContent="center">
        {daysData.map((item, index) => (
          <Grid item key={item.dt}>
            <Box
              sx={{
                width: "50px",
                height: "50px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: "50%",
                backgroundColor: "rgba(255, 255, 255, 0.1)",
                backdropFilter: "blur(10px) brightness(0.9)",
                color: "#FCFBFC",
                border: "1px solid rgba(255, 255, 255, 0.2)",
                boxShadow: "0 4px 10px rgba(0, 0, 0, 0.25)",
                cursor: "pointer",
                margin: "10px",
                textAlign: "center",
                "&:hover": {
                  backgroundColor: "rgba(255, 255, 255, 0.2)",
                },
              }}
              onClick={() => handleDayClick(index)}
            >
              <Typography variant="body2">
                {new Date(item.dt_txt).toLocaleDateString("en-US", {
                  weekday: "short",
                })}
              </Typography>
            </Box>
          </Grid>
        ))}
      </Grid>
      {selectedDay !== null && (
        <Card
          style={{
            maxWidth: "300px",
            backgroundColor: "rgba(255, 255, 255, 0.1)",
            backdropFilter: "blur(5px) brightness(0.9)",
            borderRadius: "15px",
            color: "#F5FEFD",
            border: "1px solid rgba(255, 255, 255, 0.2)",
            boxShadow: "0 4px 10px rgba(0, 0, 0, 0.25)",
            marginTop: "20px",
            marginLeft: "auto",
            marginRight: "auto",
          }}
        >
          <CardContent>
            <Typography variant="h6" gutterBottom align="center">
              {new Date(daysData[selectedDay].dt_txt).toLocaleDateString(
                "en-US",
                { weekday: "long" }
              )}
            </Typography>
            <Typography variant="body1" align="center">
              Date: {daysData[selectedDay].dt_txt.split(" ")[0]}
            </Typography>
            <Typography variant="body1" align="center">
              Temperature: {daysData[selectedDay].main.temp} °C
            </Typography>
            <Typography variant="body1" align="center">
              Humidity: {daysData[selectedDay].main.humidity} %
            </Typography>
            <Typography variant="body1" align="center">
              Wind Speed: {daysData[selectedDay].wind.speed} m/s
            </Typography>
            <Typography variant="body1" align="center">
              Weather: {daysData[selectedDay].weather[0].description}
            </Typography>
          </CardContent>
        </Card>
      )}
    </>
  );
};

export default DaysData;
