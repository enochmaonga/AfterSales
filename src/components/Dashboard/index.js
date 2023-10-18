import React, { useEffect, useRef, useState } from "react";
import Card from "@mui/material/Card";
import Chart from "chart.js/auto"; // Use 'chart.js/auto' for automatic imports
import {
  Grid,
  TextField,
  InputAdornment,
  Typography,
  Container,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

function DashBoard() {
  const barChartRef = useRef(null);
  const pieChartRef = useRef(null);
  const [searchTerm, setSearchTerm] = useState();

  useEffect(() => {
    const createBarGraph = () => {
      if (barChartRef.current) {
        new Chart(barChartRef.current, {
          type: "bar",
          data: {
            labels: [
              "Total Repairs",
              "Collected",
              "Pending Collection",
              "Unrepaired",
            ],
            datasets: [
              {
                label: "Phone Repair Statistics",
                data: [100, 80, 20, 5],
                backgroundColor: ["#fbe9e7", "#bdbdbd", "#a1887f", "#ffccbc"],
              },
            ],
          },
        });
      }
    };

    const createPieChart = () => {
      if (pieChartRef.current) {
        new Chart(pieChartRef.current, {
          type: "pie",
          data: {
            labels: ["Neon", "Nokia", "Samsung", "Oppo"],
            datasets: [
              {
                data: [30, 20, 15, 35],
                backgroundColor: ["#fbe9e7", "#bdbdbd", "#a1887f", "#ffccbc"],
              },
            ],
          },
        });
      }
    };

    createBarGraph();
    createPieChart();
  }, []);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <Container maxWidth="xl">
      <Typography
        variant="h6"
        sx={{
          display: "flex",
          justifyContent: "left",
          mt: 2,
          ml: "2%",
          mb: 2,
          color: "#a1887f",
        }}
      >
        Admin DashBoard
      </Typography>
      <Card
        style={{
          width: "100%",
          borderRadius: "3vh",
          background: "#e8eaf6",
        }}
      >
        <Grid container spacing={1}>
          <Grid item xs={12} sm={8} md={9} xl={10} sx={{ ml: 3, mt: 2 }}>
            <form>
              <TextField
                id="search-bar"
                className="text"
                label="search"
                variant="outlined"
                placeholder="Enter username..."
                sx={{ minWidth: "90%" }}
                onChange={handleSearch}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon style={{ fill: "blue" }} />
                    </InputAdornment>
                  ),
                }}
              />
            </form>
          </Grid>
        </Grid>
        <Grid container spacing={1} sx={{ padding: 3 }}>
          <Grid item xs={12} sm={6} md={4} xl={3}>
            <Card
              sx={{
                height: 160,
                borderRadius: 3,
                backgroundColor: "#fbe9e7",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "column", // To stack the text vertically
                textAlign: "center", // Center align text
              }}
            >
              <Typography
                variant="h6"
                fontWeight="bold"
                sx={{ fontSize: "24px" }}
              >
                Total Sales
              </Typography>
              <Typography sx={{ fontSize: "20px" }}>Kshs 10,000</Typography>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={4} xl={3}>
            <Card
              sx={{
                height: 160,
                borderRadius: 3,
                backgroundColor: "#fbe9e7",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "column", // To stack the text vertically
                textAlign: "center", // Center align text
              }}
            >
              <Typography
                variant="h6"
                fontWeight="bold"
                sx={{ fontSize: "24px" }}
              >
                Total Handsets: 60
              </Typography>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={4} xl={3}>
            <Card
              sx={{
                height: 160,
                borderRadius: 3,
                backgroundColor: "#fbe9e7",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Typography    variant="h6"
                fontWeight="bold"
                sx={{ fontSize: "24px" }}>Total Spare Parts: 86</Typography>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={4} xl={3}>
            <Card
              sx={{
                height: 160,
                borderRadius: 3,
                backgroundColor: "#fbe9e7",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Typography    variant="h6"
                fontWeight="bold"
                sx={{ fontSize: "24px" }}>Average SLA: 5days</Typography>
            </Card>
          </Grid>
        </Grid>
        <Grid container spacing={2} sx={{ padding: 3 }}>
          <Grid item xs={12} sm={7} md={7} xl={8}>
            <Card sx={{ height: 300, borderRadius: 3 }}>
              <canvas ref={barChartRef} />
            </Card>
          </Grid>
          <Grid item xs={12} sm={5} md={5} xl={4}>
            <Card sx={{ height: 300, borderRadius: 3 }}>
              <canvas ref={pieChartRef} />
            </Card>
          </Grid>
        </Grid>
      </Card>
    </Container>
  );
}
export default DashBoard;
