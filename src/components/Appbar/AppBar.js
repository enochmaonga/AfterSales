import * as React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Image from 'next/image';
import Link from 'next/link';

const drawerWidth = 240;
const navItems = [ 'Customer', 'Repairs', 'Spares', 'Dispatch', 'Collection', 'Finance'];
const navItemLinks = ['/customer', '/repairs', '/spares', '/dispatch', '/collection', '/finance'];

function DrawerAppBar(props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const drawer = (
    <Box sx={{ textAlign: 'center' }}>
      <Box sx={{ marginLeft: '10px' }}>
        <Image src="/images/josaka5.png" width={50} height={60} alt="logo" />
      </Box>
      <Divider />
      <List>
        {navItems.map((item, index) => (
          <ListItem key={item} disablePadding>
            <Link href={navItemLinks[index]} passHref>
              <ListItemButton component="a" onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
                <ListItemText primary={item} />
              </ListItemButton>
            </Link>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar component="nav" sx={{ height: '110px' }}>
        <Toolbar>
          <Box sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
            <Box sx={{ marginLeft: '30px', marginTop: 1 }}>
              <Image src="/images/josaka5.png" width={50} height={60} alt="logo" />
            </Box>
            <Typography variant="h6" sx={{ marginLeft: '10px' }}>
              Josaka Services
            </Typography>
          </Box>
          <Box sx={{ marginLeft: 'auto', marginTop: 5 }}>
            {navItems.map((item, index) => (
              <Link key={item} href={navItemLinks[index]} passHref>
                <Button component="a" sx={{ color: '#fff' }}>
                  {item}
                </Button>
              </Link>
            ))}
          </Box>
        </Toolbar>
      </AppBar>
      <Box component="nav">
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
      </Box>
    </Box>
  );
}

DrawerAppBar.propTypes = {
  window: PropTypes.func,
};

export default DrawerAppBar;


