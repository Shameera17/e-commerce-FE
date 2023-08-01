import React from "react";

import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";

import MenuAppBar from "../AppBar";

const Layout: React.FC = () => {
  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        width: "100%",
      }}
    >
      <MenuAppBar />
      <Box sx={{ height: "90%", width: "90%" }}>
        <Outlet />
      </Box>
    </div>
  );
};

export default Layout;
