import { Divider, Typography } from "@mui/material";

const PageHeading = ({ heading }: { heading: string }) => {
  return (
    <Typography variant="h4" component="h4" gutterBottom marginBottom={"5px"}>
      {heading}
      <Divider sx={{ marginBottom: "30px", width: "100%" }} />
    </Typography>
  );
};

export default PageHeading;
