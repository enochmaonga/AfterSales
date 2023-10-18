import React, { useState } from 'react';
import { Tabs, Tab, Card, CardContent, Typography, Box, Grid } from '@mui/material';
import PageContainer from '../PageContainer';
import PageSection from '../PageSection';
import BookedTable from './BookedTable';
import RepairedTable from './RepairedTable';
import Collected from './Collected';


const TabPanel = ({ children, value, index }) => {
    return (
      <div role="tabpanel" hidden={value !== index}>
        {value === index && <Box p={3}>{children}</Box>}
      </div>
    );
  };

function PhoneCard({bookings}) {
  const [selectedTab, setSelectedTab] = useState(0);

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  return (
    <PageSection>
    <PageContainer>
    <Grid container>
        <Grid item sx={{ ml: "40%", color: "#90caf9" }}>
          <Typography variant="h4">Service Management</Typography>
        </Grid>
      </Grid>
    <Card >
      <CardContent>
      
        <Tabs value={selectedTab} onChange={handleTabChange} centered>
          <Tab label="Booked" />
          <Tab label="Repaired" />
          <Tab label="Cutomer Pickup" />
        </Tabs>
        <TabPanel value={selectedTab} index={0}>
          {/* Display Booked Phones */}
          <BookedTable />
       
        </TabPanel>
        <TabPanel value={selectedTab} index={1}>
          {/* Display Repaired Phones */}
          <RepairedTable />
        </TabPanel>
        <TabPanel value={selectedTab} index={2}>
          {/* Display Collected Phones */}
          <Collected />
        </TabPanel>
      </CardContent>
    </Card>
    </PageContainer>
    </PageSection>
  );
};



export default PhoneCard;