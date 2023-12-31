import * as React from "react";

import { AccountCircle, Login, Logout } from "@mui/icons-material";
import AdbIcon from "@mui/icons-material/Adb";
import {
  AppBar,
  Box,
  Button,
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { clearToken, signout } from "../../redux/reducers/auth.reducer";
import { resetProducts } from "../../redux/reducers/product.reducer";
import { RootState } from "../../redux/store";
import CartBadge from "../CartBadge";

export default function MenuAppBar() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const navigate = useNavigate();
  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const { userInfo } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();

  return (
    <Box sx={{ flexGrow: 1, width: "100%" }}>
      <AppBar position="relative">
        <Toolbar disableGutters sx={{ padding: "0 40px" }}>
          <AdbIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            onClick={() => {
              navigate("/");
              setAnchorEl(null);
            }}
            sx={{
              mr: 2,
              display: "flex",
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
              flexGrow: 1,
              cursor: "pointer",
            }}
          >
            Shopify
          </Typography>

          {userInfo ? (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: "5px",
              }}
            >
              <Typography component={"p"}>Hi {userInfo.name}</Typography>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorEl)}
                onClose={() => setAnchorEl(null)}
              >
                <MenuItem
                  onClick={() => {
                    navigate(`${userInfo.role}/profile`);
                    setAnchorEl(null);
                  }}
                >
                  <ListItemIcon>
                    <Login fontSize="small" />
                  </ListItemIcon>
                  Dashbord
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    setAnchorEl(null);

                    dispatch(signout());
                    // Clear the token from Redux and localStorage
                    dispatch(clearToken());
                    localStorage.removeItem("token");
                    dispatch(resetProducts());

                    navigate("/");
                  }}
                >
                  <ListItemIcon>
                    <Logout fontSize="small" />
                  </ListItemIcon>
                  Sign Out
                </MenuItem>
              </Menu>
              {userInfo.role === "buyer" && <CartBadge />}
            </div>
          ) : (
            <>
              <Button
                style={{
                  backgroundColor: "white",
                  color: "black",
                  fontWeight: "bold",
                  marginRight: "5px",
                  borderColor: "black",
                }}
                variant="outlined"
                onClick={() => navigate("/signin")}
              >
                Sign In
              </Button>
              <Button
                style={{
                  backgroundColor: "white",
                  fontWeight: "bold",
                  borderColor: "#1976d2",
                }}
                variant="outlined"
                onClick={() => navigate("/signup")}
              >
                Sign Up
              </Button>
            </>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
