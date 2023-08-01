import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { enqueueSnackbar } from "notistack";
import { useDispatch, useSelector } from "react-redux";

import { manageModal } from "../../redux/reducers/auth.reducer";
import { setCartItem } from "../../redux/reducers/cart.reducer";
import { RootState } from "../../redux/store";
import { ICreatedProduct } from "../../types/interfaces";

const Product = ({ product }: { product: ICreatedProduct }) => {
  const { userInfo, token } = useSelector((state: RootState) => state.auth);

  const dispatch = useDispatch();
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
        <Button
          onClick={() => {
            try {
              if (userInfo && token) {
                dispatch(
                  setCartItem({
                    name: name,
                    quantity: 1,
                    sellerId: product.sellerId,
                    productId: product._id,
                    imageFile: imageFile,
                    price: price,
                  }),
                );
              } else {
                dispatch(manageModal());
              }
            } catch (error: any) {
              enqueueSnackbar(error?.message || "Please try again!", {
                variant: "warning",
                anchorOrigin: {
                  horizontal: "right",
                  vertical: "top",
                },
              });
            }
          }}
          size="small"
        >
          Add to cart
        </Button>
      </CardActions>
    </Card>
  );
};
export default Product;
