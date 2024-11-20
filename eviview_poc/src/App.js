import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  IconButton,
  AppBar,
  Toolbar,
  Typography,
  CssBaseline,
  Divider,
  SpeedDialIcon,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import HomeIcon from "@mui/icons-material/Home";
import StorageIcon from "@mui/icons-material/Storage";
import BarChartIcon from "@mui/icons-material/BarChart";
import DataConnections from "./pages/DataConnections";
import DataTableBuilder from "./pages/DataTableBuilder";
import VisualizationBuilder from "./pages/VisualizationBuilder";
import WidgetBuilder from "./pages/WidgetBuilder";

const drawerWidth = 240;

export default function App() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(true);

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  const navItems = [
    { text: "Data Connections", icon: <HomeIcon />, path: "/" },
    { text: "Data Table Builder", icon: <StorageIcon />, path: "/data-table-builder" },
    { text: "Visualization Builder", icon: <BarChartIcon />, path: "/visualization-builder" },
    { text: "Widget Builder", icon: <SpeedDialIcon />, path: "/widget-builder" },
  ];

  return (
    <Router>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />

        {/* AppBar */}
        <AppBar
          position="fixed"
          sx={{
            backgroundColor: "#1565c0", // Softer blue
            zIndex: (theme) => theme.zIndex.drawer + 1,
          }}
        >
          <Toolbar>
            <IconButton
              color="inherit"
              edge="start"
              onClick={toggleDrawer}
              sx={{ marginRight: 1 }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" noWrap component="div">
              EviView PoC
            </Typography>
          </Toolbar>
        </AppBar>

        {/* Drawer */}
        <Drawer
          variant="persistent"
          open={isDrawerOpen}
          sx={{
            width: isDrawerOpen ? drawerWidth : 0,
            flexShrink: 0,
            "& .MuiDrawer-paper": {
              width: isDrawerOpen ? drawerWidth : 0,
              transition: "width 0.3s",
              backgroundColor: "#1565c0", // Softer blue
              color: "white",
              borderRight: "none",
              boxShadow: "none",
            },
          }}
        >
          <Toolbar />
          <Divider sx={{ backgroundColor: "white" }} />
          <List>
            {navItems.map((item, index) => (
              <ListItem
                button
                key={index}
                component={Link}
                to={item.path}
                sx={{
                  "&:hover": { backgroundColor: "#0d47a1" },
                }}
              >
                <ListItemIcon sx={{ color: "white" }}>{item.icon}</ListItemIcon>
                <ListItemText
                  primary={item.text}
                  primaryTypographyProps={{
                    sx: { color: "white" }, // Text Color
                  }}
                />
              </ListItem>
            ))}
          </List>
        </Drawer>

        {/* Main Content */}
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            marginLeft: isDrawerOpen ? `${drawerWidth}px` : "0px",
            transition: "margin-left 0.3s",
            padding: 0, // No extra padding
          }}
        >
          <Toolbar />
          <Routes>
            <Route path="/" element={<DataConnections />} />
            <Route path="/data-table-builder" element={<DataTableBuilder />} />
            <Route path="/visualization-builder" element={<VisualizationBuilder />} />
            <Route path="/widget-builder" element={<WidgetBuilder />} />
          </Routes>
        </Box>
      </Box>
    </Router >
  );
}
