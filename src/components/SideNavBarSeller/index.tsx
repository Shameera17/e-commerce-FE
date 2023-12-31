import { AccountBox, AddBox } from "@mui/icons-material";
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

const SideNavBarSeller = () => {
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
              navigate("/seller/profile");
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
              navigate("/seller/createproduct");
            }}
          >
            <ListItemIcon>
              <AddBox />
            </ListItemIcon>
            <ListItemText primary={"Create Product"} />
          </ListItemButton>
        </ListItem>
        <Divider />
      </List>
    </Box>
  );
};

export default SideNavBarSeller;
