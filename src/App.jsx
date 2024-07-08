import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Grid,
  Container,
  Typography,
  useMediaQuery,
  useTheme,
  IconButton,
} from "@mui/material";
import SearchBar from "./components/SearchBar";
import SearchedCityCard from "./components/SearchedCityCard";
import DaysData from "./components/DaysData";
import Visual from "./components/Visual";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Signup from "./components/Signup";
const App = () => {
  const defaultCity = "Delhi";
  const [city, setCity] = useState(defaultCity);
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);
  const [showSignup, setShowSignup] = useState(false);

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const isExtraSmallScreen = useMediaQuery("(max-width: 375px)");
  const isMediumSmallScreen = useMediaQuery("(max-width: 425px)");

  const fetchData = async (cityName) => {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=ace93b4083bb410ad22515d00105a15c&units=metric`
      );
      setWeatherData(response.data);
      setError(null);
    } catch (error) {
      setError(error);
      setWeatherData(null);
    }
  };

  useEffect(() => {
    fetchData(defaultCity);
  }, []);

  const handleSearch = (cityName) => {
    fetchData(cityName);
    setCity(cityName);
  };

  const toggleSignup = () => {
    setShowSignup(!showSignup);
  };

  return (
    <div
      className="app-wrapper"
      style={{
        backgroundImage: `url('../assets/background.jpg')`,
        backgroundSize: "cover",
        minHeight: "100vh",
        padding: "20px",
      }}
    >
      <Container maxWidth="lg">
        <Grid container alignItems="center" justifyContent="space-between">
          <Grid item>
            <Typography
              variant="h4"
              align="center"
              gutterBottom
              noWrap
              style={{
                fontSize: isExtraSmallScreen
                  ? "1.5rem"
                  : isMediumSmallScreen
                  ? "1.75rem"
                  : isSmallScreen
                  ? "2rem"
                  : "2.5rem",
              }}
            >
              E-Weather
            </Typography>
          </Grid>
          <Grid item>
            <IconButton onClick={toggleSignup}>
              <AccountCircleIcon fontSize="large" />
            </IconButton>
          </Grid>
        </Grid>
        {showSignup && <Signup />}
        <SearchBar onSearch={handleSearch} />
        {error && (
          <Typography variant="body1" color="error">
            No City Found!
          </Typography>
        )}
        {weatherData && (
          <Grid container spacing={3} justifyContent="center">
            <Grid item xs={12} style={{ marginTop: "20px" }}>
              <SearchedCityCard city={city} data={weatherData.list[0]} />
            </Grid>
            {!isSmallScreen && (
              <Grid item xs={12}>
                <DaysData data={weatherData.list} />
              </Grid>
            )}
            <Grid item xs={12}>
              <Visual data={weatherData.list} />
            </Grid>
          </Grid>
        )}
      </Container>
    </div>
  );
};

export default App;
