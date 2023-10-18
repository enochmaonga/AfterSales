import { Box, Button, Container, Grid, Stack, Typography, styled, useMediaQuery, useTheme } from "@mui/material";
import React, { useEffect, useState } from "react";
import NextLink from "next/link";
import PageSection from "./PageSection";
import PageContainer from "./PageContainer";


const StyledTypographyHeading = styled(Typography)(() => ({
  marginBottom: 20,
  textAlign: "center",
}));

const StyledTypographyContent = styled(Typography)(({ theme }) => ({
  fontSize: 24,
  textAlign: "center",
  [theme.breakpoints.down("md")]: {
    fontSize: 14,
  },
}));

const StyledTypographyItalic = styled(Typography)(({ theme }) => ({
  fontSize: 24,
  fontStyle: "italic",
  [theme.breakpoints.down("md")]: {
    fontSize: 14,
  },
}));

const SectionOneButtonWrapper = styled(Box)(() => ({
  display: "flex",
  justifyContent: "center",
  paddingLeft: 24,
  paddingRight: 24,
  marginTop: 50,
}));
function Home() {
  const themeDefinitions = useTheme();
  const isMobile = useMediaQuery(themeDefinitions.breakpoints.down("md"));
  const [message, setMessage] = useState('');

  useEffect(() => {
    // Make an API call to your Node.js server
    fetch('http://localhost:3001/api/someEndpoint')
      .then((response) => response.json())
      .then((data) => {
        setMessage(data.message);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);
  return (
    <PageSection component="section">
    <PageContainer
      sx={(theme) => ({
        mt: 15,
        mb: 30,
        pt: 0,
        pb: 0,
        [theme.breakpoints.down("md")]: {
          mt: 5,
          mb: 8,
        },
      })}
    >
  
    <Grid container spacing={2}>
      <Grid item lg={3} />
      <Grid item lg={6} xl={6} sm={12} xs={12}>
        <StyledTypographyHeading variant="h1" color="#283593">
          Welcome to Joscare
        </StyledTypographyHeading>
        <StyledTypographyContent variant="body1">
          Customer first.{" "}
          <StyledTypographyItalic
            variant="body1"
            color="primary"
            component="span"
          >
            Safeguard Customer's Property,
          </StyledTypographyItalic>{" "}
          Provide best solution{" "}
          <StyledTypographyItalic
            variant="body1"
            color="primary"
            component="span"
          >
           In real time
          </StyledTypographyItalic>{" "}
          at minimal cost{" "}
          <StyledTypographyItalic
            variant="body1"
            color="primary"
            component="span"
          >
            You need that customer 
          </StyledTypographyItalic>{" "}
          tomorrow.
        </StyledTypographyContent>
        <SectionOneButtonWrapper>
          <Stack direction="row" spacing={5}>
          <NextLink href="/login" passHref>
            <Button
              variant="outlined"
              size={isMobile ? "small" : "large"}
            >
             LogIn
            </Button>
          </NextLink>
        </Stack>
      </SectionOneButtonWrapper>
    </Grid>
    </Grid>
 </PageContainer>
 </PageSection>
  )
}

export default Home;