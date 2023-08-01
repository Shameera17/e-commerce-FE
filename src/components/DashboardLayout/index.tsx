import React from "react";

import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";

import MenuAppBar from "../AppBar";
import SideNavBarSeller from "../SideNavBarSeller";

const DashboardLayout: React.FC = () => {
  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        width: "100%",
      }}
    >
      <MenuAppBar />
      <Box
        sx={{
          height: "100%",
          width: "100%",
          display: "flex",
          overflowY: "auto",
        }}
      >
        <SideNavBarSeller />
        <div style={{ width: "100%", padding: "30px" }}>
          <Box
            sx={{
              display: "flex",
              alignItems: "start",
              flexDirection: "column",
              width: "100%",
            }}
          >
            <Outlet />
          </Box>
        </div>
      </Box>
    </div>
  );
};

export default DashboardLayout;
