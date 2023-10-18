import * as React from "react";
import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Image from "next/image";
import Link from "next/link";
import { Tab, Tabs } from "@mui/material";
import { useRouter } from "next/router";

const drawerWidth = 240;
const navItems = [
  { label: "Home", link: "/", selectedColor: "#e8eaf6" },
  { label: "Customer", link: "/customer", selectedColor: "#e8eaf6" },
  { label: "Repairs", link: "/repairs", selectedColor: "#e8eaf6"  },
  { label: "Spares", link: "/spares", selectedColor: "#e8eaf6"  },
  { label: "Dashboard", link: "/dash-board", selectedColor: "#e8eaf6"  },
];

function Layout(props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const router = useRouter();

  // Determine the active tab based on the current route
  React.useEffect(() => {
    const activeTab = navItems.findIndex((item) => item.link === router.pathname);
    setActiveTab(activeTab === -1 ? 0 : activeTab);
  }, [router.pathname]);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const drawer = (
    <Box sx={{ textAlign: "center" }}>
      <Box sx={{ marginLeft: "10px" }}>
        <Image src="/images/josaka5.png" width={50} height={60} alt="logo" />
      </Box>
      <Divider />
      <List>
        {navItems.map((item, index) => (
          <ListItem key={item.label} disablePadding>
            <Link href={item.link} passHref>
              <ListItemButton onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
                <ListItemText primary={item.label} />
              </ListItemButton>
            </Link>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  const [activeTab, setActiveTab] = React.useState(0);

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar component="nav">
        <Toolbar>
          <Box sx={{ display: "flex", alignItems: "center", flexGrow: 1 }}>
            <Box sx={{ marginLeft: "30px", marginTop: 1 }}>
              <Image src="/images/josaka5.png" width={50} height={60} alt="logo" />
            </Box>
            <Typography variant="h6" sx={{ marginLeft: "10px" }}>
              Joscare Services
            </Typography>
          </Box>

          <Tabs
            value={activeTab}
            onChange={handleTabChange}
            sx={{ marginLeft: "auto" }}
          >
            {navItems.map((item, index) => (
              <Tab
                key={item.label}
                label={item.label}
                component={item.link === "/" ? Link : "a"}
                href={item.link}
                sx={{ color: "#fff", 
              backgroundColor:
            activeTab === index ? item.selectedColor : "transparent",
          }}
              />
            ))}
          </Tabs>
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
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
      </Box>
    </Box>
  );
}

Layout.propTypes = {
  window: PropTypes.func,
};

export default Layout;
