import { AccountBox, AddBox, ViewList } from "@mui/icons-material";
import {
  Box,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const SideNavBarBuyer = () => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{ width: 250, borderRight: "2px solid #D3D3D3", paddingTop: "20px" }}
      role="presentation"
    >
      <List>
        <ListItem key={0} disablePadding>
          <ListItemButton
            onClick={() => {
              navigate("/buyer/profile");
            }}
          >
            <ListItemIcon>
              <AccountBox />
            </ListItemIcon>
            <ListItemText primary={"Profile"} />
          </ListItemButton>
        </ListItem>
        <Divider />

        <ListItem key={1} disablePadding>
          <ListItemButton
            onClick={() => {
              navigate("/buyer/cart");
            }}
          >
            <ListItemIcon>
              <AddBox />
            </ListItemIcon>
            <ListItemText primary={"Cart"} />
          </ListItemButton>
        </ListItem>
        <Divider />

        <ListItem key={2} disablePadding>
          <ListItemButton
            onClick={() => {
              navigate("/buyer/orders");
            }}
          >
            <ListItemIcon>
              <ViewList />
            </ListItemIcon>
            <ListItemText primary={"View Orders"} />
          </ListItemButton>
        </ListItem>
      </List>
      <Divider />
    </Box>
  );
};

export default SideNavBarBuyer;
