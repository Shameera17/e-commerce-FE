import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";

import { ICreatedProduct } from "../../types/interfaces";

const Product = ({ product }: { product: ICreatedProduct }) => {
  const { name, price, imageFile, remainingQuantity } = product;
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        sx={{ height: 140, objectFit: "fill" }}
        component={"img"}
        src={imageFile}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Price : {price}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Remaining Quantity : {remainingQuantity}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Add to cart</Button>
      </CardActions>
    </Card>
  );
};
export default Product;