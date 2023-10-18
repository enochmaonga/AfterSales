import React, { useState } from "react";
import Card from "@mui/material/Card";
import {  Button, Grid,  Stack, } from "@mui/material";
import DashBoard from "../Dashboard";
import Users from "../Dashboard/Users";
import PhoneCard from "../RepairManagement/PhoneCard";
import Finance from "../Dashboard/Finance";


const data = [
  {
    id: 1,
    avatarUrl: "url_to_avatar_1",
    fullName: "Allan Mokua",
    2013: 16500,
    2014: 16500,
    2015: 16500,
    2016: 16500,
    2017: 16500,
    2018: 16500,
    2019: 16500,
    2020: 16500,
    2021: 16500,
    2022: 16500,
    2023: 16500,
    // ... other years ...
    2024: "",
  },
  {
    id: 2,
    avatarUrl: "url_to_avatar_2",
    fullName: "Lameck Nyaboga",
    2013: 25575,
    2014: 25575,
    2015: 25575,
    2016: 25575,
    2017: 25575,
    2018: 25575,
    2019: 25575,
    2020: "",
    2021: "",
    2022: "",
    2023: "",

    2024: "",
  },
  {
    id: 1,
    avatarUrl: "url_to_avatar_3",
    fullName: "Joy Nyamweya",
    2013: 18000,
    2014: 18000,
    2015: 18000,
    2016: 18000,
    2017: 18000,
    2018: 18000,
    2019: 18000,
    2020: 18000,
    2021: 18000,
    2022: 18000,
    2023: "",
    2024: "",
  },
];

const CardSection = () => {
  const [selectedChild, setSelectedChild] = useState(null);
  const handleChildSelection = (child) => {
    setSelectedChild(child);
  };

  const renderSelectedChild = () => {
    switch (selectedChild) {
      case "user-management":
        return <Users />;
      case "dash-board":
        return <DashBoard />;
      case "repairs":
        return <PhoneCard />;
      case "collection":
        return <Finance />;
      // case "dispatch":
      //   return <Dispatch />;

      default:
        return null;
    }
  };

  return (
    <>
      <Card
        style={{
          width: "95%",
          minHeight: "85vh",
          borderRadius: "5vh",
          marginTop: "2vh",
          marginBottom: "2vh",
         
        }}
      >
        <Grid container>
          <Grid item xs={12} sm={6} md={4} xl={1} sx={{ mt: 20, mr: 0, pr: 0 }}>
            <Stack spacing={2} sx={{ pl: 3, mt:3 }}>
              <Button
                onClick={() => handleChildSelection("user-management")}
                variant="contained"
              >
                Users
              </Button>
              <Button
                onClick={() => handleChildSelection("dash-board")}
                variant="contained"
              >
                Reports
              </Button>
              <Button
                onClick={() => handleChildSelection("repairs")}
                variant="contained"
              >
                Repairs
              </Button>
              <Button
                onClick={() => handleChildSelection("collection")}
                variant="contained"
              >
                Finance
              </Button>
              <Button
                onClick={() => handleChildSelection("dispatch")}
                variant="contained"
              >
                Settings
              </Button>
            </Stack>
          </Grid>
          <Grid item xs={12} sm={6} md={8} xl={11} sx={{ pl: 2, pb: 2, Pr: 0 }}>
            <Grid
              sx={{
                display: "flex",
                justifyContent: "center",
           
              }}
            >
              {selectedChild ? (
                renderSelectedChild()
              ) : (
                <DashBoard data={data} />
              )}
            </Grid>
          
          </Grid>
        </Grid>
      </Card>
    </>
  );
};

export default CardSection;
