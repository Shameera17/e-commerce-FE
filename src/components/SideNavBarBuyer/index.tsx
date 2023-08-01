import { AccountBox, AddBox } from "@mui/icons-material";
import {
  Box,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";

const SideNavBarBuyer = () => {
  const list = () => (
    <Box sx={{ width: 250, borderRight: "2px solid #000" }} role="presentation">
      <List>
        <ListItem key={0} disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <AccountBox />
            </ListItemIcon>
            <ListItemText primary={"Profile"} />
          </ListItemButton>
        </ListItem>
        <ListItem key={1} disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <AddBox />
            </ListItemIcon>
            <ListItemText primary={"Cart"} />
          </ListItemButton>
        </ListItem>
      </List>
      <Divider />
    </Box>
  );
  return (
    <Drawer anchor={"left"} open={true}>
      {list()}
    </Drawer>
  );
};

export default SideNavBarBuyer;
