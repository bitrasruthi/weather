import "./App.css";
import React, { FC, useState, useEffect } from "react";
import axios from "axios";
import Weather from "./Components/weather";
import { ThemeProvider, createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#1d1d1d",
    },
    secondary: {
      main: "#d8cbc3",
    },
  },
  typography: {
    fontFamily: "Poppins",
  },
});

const App: FC = () => {
  const [latitude, setLat] = useState<number>();
  const [longitude, setLong] = useState<number>();
  const [error, setError] = useState<boolean>(false);
  const [data, setData] = useState<any>({});

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(function (position) {
      setLat(position.coords.latitude);
      setLong(position.coords.longitude);
    });
    if (latitude && longitude) {
      axios
        .get(
          `https://api.openweathermap.org/data/2.5/weather/?lat=${latitude}&lon=${longitude}&units=metric&APPID=8fff8bf4e546e003b600b51c0022ce09`
        )
        .then((result) => {
          if (result) {
            setData(result.data);
          }
        })
        .catch((e) => {
          if (axios.isCancel(e)) return;
          setError(true);
        });
    }
  }, [latitude, longitude]);

  return (
    <>
      <ThemeProvider theme={theme}>
        <div className="App">
          {typeof data?.main != "undefined" ? (
            <Weather weatherData={data} />
          ) : (
            ""
          )}
        </div>
      </ThemeProvider>
    </>
  );
};

export default App;
