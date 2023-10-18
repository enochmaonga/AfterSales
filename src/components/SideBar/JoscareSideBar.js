import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Link from 'next/link'; // Import the Link component from Next.js
import { Card, ListItemButton, Typography } from '@mui/material';
import SummarizeIcon from '@mui/icons-material/Summarize';
import FlipToFrontIcon from '@mui/icons-material/FlipToFront';

const drawerWidth = 240;

const theme = createTheme({
  palette: {
    background: {
      default: 'linear-gradient(135deg, #b8c6db 0%, #f5f7fa 100%)', // Light blue gradient
    },
  },
});

function PermanentDrawerLeft() {
  return (
    <ThemeProvider theme={theme}>
      <Card sx={{ display: 'flex' }}>
        <Drawer
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            '& .MuiDrawer-paper': {
              width: drawerWidth,
              boxSizing: 'border-box',
              marginTop: '105px', // Move the Drawer below the Header (adjust as needed)
            },
          }}
          variant="permanent"
          anchor="left"
        >
          <Divider />
          <Typography variant='h5' sx={{ml: "30%", mt: 5, fontWeight: "bold"}}>Summary</Typography>
          <List sx={{ mt: 10 }}>
      {[
        { text: 'Summary', link: '/Summary' },
        { text: 'Booked', link: '/Booked' },
        { text: 'Collected', link: '/Collected' },
        { text: 'Pending Collection', link: '/Pending Collection' },
        { text: 'Collection', link: '/collection' },
      ].map(({ text, link }, index) => (
        <ListItem key={text} disablePadding>
          <Link href={link} passHref>
            {/* Here, we apply custom styles to the anchor tag */}
            <ListItemButton component="a" sx={{ textDecoration: 'none' }}>
              <ListItemIcon>
                {index % 2 === 0 ? <SummarizeIcon /> : <FlipToFrontIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </Link>
        </ListItem>
      ))}
    </List>
          <Divider />
        </Drawer>
      </Card>
    </ThemeProvider>
  );
}
export default PermanentDrawerLeft;