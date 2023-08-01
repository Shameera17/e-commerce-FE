import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { useDispatch } from "react-redux";

import { removeCartItem } from "../../redux/reducers/cart.reducer";
import { ICartItem } from "../../types/interfaces";

const CartItem = ({ cart }: { cart: ICartItem }) => {
  const { name, price, imageFile, quantity, productId } = cart;

  const dispatch = useDispatch();
  return (
    <Card
      sx={{
        width: "700px",
        maxWidth: 800,
        margin: "10px 0",
        display: "flex",
        border: "1px solid #D3D3D3",
        justifyContent: "space-between",
      }}
    >
      {/* image */}
      <CardMedia
        sx={{ height: 140, width: 120, objectFit: "fill" }}
        component={"img"}
        src={imageFile}
      />

      <CardContent
        sx={{
          width: "150px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography variant="h6">Product name</Typography>
        <Typography variant="h6" color="text.secondary">
          {name}
        </Typography>
      </CardContent>
      <CardContent
        sx={{
          width: "190px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography gutterBottom component="h4">
          Price per item : {price}
        </Typography>
        <Typography component="h3">Quantity : {quantity}</Typography>
        <Typography gutterBottom fontWeight={"bold"} component="h4">
          Total Amount : {price * quantity}
        </Typography>
      </CardContent>
      <CardContent
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          rowGap: "10px",
        }}
      >
        <Button fullWidth variant="contained" color="primary">
          Buy
        </Button>
        <Button
          fullWidth
          variant="outlined"
          onClick={() => {
            dispatch(removeCartItem({ productId }));
          }}
        >
          Remove
        </Button>
      </CardContent>
    </Card>
  );
};
export default CartItem;
