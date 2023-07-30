import { Avatar, Box, Divider, Typography } from "@mui/material";
import { useSelector } from "react-redux";

import { RootState } from "../../store/configureStore";

const Profile = () => {
  const { userInfo } = useSelector((state: RootState) => state.auth);

  return (
    <Box
      sx={{ display: "flex", alignItems: "center", flexDirection: "column" }}
    >
      <Avatar sx={{ width: 100, height: 100, mt: 3 }} alt={userInfo?.name} />
      <Typography variant="h5" sx={{ mt: 2 }}>
        {userInfo?.name}
      </Typography>
      <Typography variant="body1" sx={{ mt: 1 }}>
        {userInfo?.email}
      </Typography>
      <Typography variant="body1" sx={{ mt: 1 }}>
        {userInfo?.role}
      </Typography>
      <Divider sx={{ my: 3, width: "80%" }} />
      {/* Add other profile information as needed */}
    </Box>
  );
};

export default Profile;
