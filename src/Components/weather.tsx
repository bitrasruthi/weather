import React, { FC, useState, useEffect } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Grid,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import moment, { now } from "moment";
import axios from "axios";
import * as yup from "yup";
import { useFormik } from "formik";

interface Props {
  weatherData?: any;
}

const Weather: FC<Props> = ({ weatherData }) => {
  const [data, setData] = useState<any>();

  const validationSchema = yup.object({
    City: yup.string().required("City is requried"),
  });
  const formik = useFormik({
    initialValues: { City: "", Country: "" },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      axios
        .get(
          `https://api.openweathermap.org/data/2.5/weather/?q=${values.City}&country=${values.Country}&units=metric&APPID=8fff8bf4e546e003b600b51c0022ce09`
        )
        .then((result) => {
          if (result) {
            setData(result.data);
          }
        })
        .catch((e) => {
          if (axios.isCancel(e)) return;
        });
    },
  });

  useEffect(() => {
    if (weatherData) {
      setData(weatherData);
    }
  }, [weatherData]);

  return (
    <Container sx={{ pt: 4 }}>
      <Paper elevation={1} sx={{ pt: 2 }}>
        <Typography variant="h5" sx={{ fontWeight: "bold", mb: 1 }}>
          Weather App
        </Typography>
        <Card
          elevation={2}
          sx={{
            maxWidth: 550,
            borderRadius: "15px",
            ml: 38,
          }}
        >
          <form onSubmit={formik.handleSubmit}>
            <Box maxWidth={400} sx={{ justifyContent: "center", p: 4 }}>
              <Grid container spacing={4}>
                <Grid item xs={5}>
                  <TextField
                    fullWidth
                    placeholder="Enter City"
                    size="small"
                    id="City"
                    value={formik.values.City}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.City && Boolean(formik.errors.City)}
                    helperText={formik.touched.City && formik.errors.City}
                  />
                </Grid>
                <Grid item xs={5}>
                  <TextField
                    fullWidth
                    placeholder="Enter Country"
                    size="small"
                    id="Country"
                    value={formik.values.Country}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                </Grid>
                <Grid item xs={2}>
                  <Button
                    type="submit"
                    variant="contained"
                    sx={{ fontWeight: "bold" }}
                  >
                    Submit
                  </Button>
                </Grid>
              </Grid>
            </Box>
          </form>
          <CardContent
            sx={{
              textAlign: "left",
              background: "black",
              color: "white",
            }}
          >
            <Typography variant="h5">
              {data?.name}, {data?.sys?.country}. Weather
            </Typography>
            <Typography sx={{ color: " grey " }}>
              As of {moment(new Date()).format("hh:mm:ss a").toUpperCase()}
            </Typography>
            <Box display={"flex"} justifyContent="center">
              <Typography
                sx={{
                  fontWeight: "bold",
                  fontSize: "40px",
                  textAlign: "center",
                  mr: 2,
                }}
              >
                {Math.ceil(Number(data?.main?.temp))} &deg;C
              </Typography>
              <img
                style={{ width: 80, height: 80 }}
                src={`https://openweathermap.org/img/wn/${
                  data?.weather && data?.weather[0]?.icon
                }.png`}
              />
            </Box>
          </CardContent>
          <Grid container spacing={4} sx={{ p: 4 }}>
            <Grid item xs={6}>
              <Box display={"flex"} justifyContent="space-between">
                <Typography sx={{ fontWeight: "bold", mr: 2 }}>
                  High/Low
                </Typography>
                <Typography sx={{ color: "grey" }}>
                  {" "}
                  {`${Math.ceil(Number(data?.main?.temp_min))}/${Math.ceil(
                    Number(data?.main?.temp_max)
                  )}`}
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={6}>
              <Box display={"flex"} justifyContent="space-between">
                <Typography sx={{ fontWeight: "bold", mr: 2 }}>Wind</Typography>
                <Typography sx={{ color: "grey" }}>
                  {data?.wind?.speed}km/ hr
                </Typography>
              </Box>
            </Grid>

            <Grid item xs={6}>
              <Box display={"flex"} justifyContent="space-between">
                <Typography sx={{ fontWeight: "bold", mr: 2 }}>
                  Humidity
                </Typography>
                <Typography sx={{ color: "grey" }}>
                  {" "}
                  {data?.main?.humidity} %
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={6}>
              <Box display={"flex"} justifyContent="space-between">
                <Typography sx={{ fontWeight: "bold", mr: 2 }}>
                  Wind Direction
                </Typography>
                <Typography sx={{ color: "grey" }}>
                  {data?.wind?.deg} &deg;C
                </Typography>
              </Box>
            </Grid>

            <Grid item xs={6}>
              <Box display={"flex"} justifyContent="space-between">
                <Typography sx={{ fontWeight: "bold", mr: 2 }}>
                  Pressure
                </Typography>
                <Typography sx={{ color: "grey" }}>
                  {" "}
                  {data?.main?.pressure} hPa
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={6}>
              <Box display={"flex"} justifyContent="space-between">
                <Typography sx={{ fontWeight: "bold", mr: 2 }}>
                  Sunrise
                </Typography>
                <Typography sx={{ color: "grey" }}>
                  {moment(data?.sys?.sunrise * 1000)
                    .format("hh:mm:ss a")
                    .toUpperCase()}
                </Typography>
              </Box>
            </Grid>

            <Grid item xs={6}>
              <Box display={"flex"} justifyContent="space-between">
                <Typography sx={{ fontWeight: "bold", mr: 2 }}>
                  Visibility
                </Typography>
                <Typography sx={{ color: "grey" }}>
                  {" "}
                  {data?.visibility} Km
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={6}>
              <Box display={"flex"} justifyContent="space-between">
                <Typography sx={{ fontWeight: "bold", mr: 2 }}>
                  Sunset
                </Typography>
                <Typography sx={{ color: "grey" }}>
                  {moment(data?.sys?.sunset * 1000)
                    .format("hh:mm:ss a")
                    .toUpperCase()}
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Card>
      </Paper>
    </Container>
  );
};

export default Weather;
