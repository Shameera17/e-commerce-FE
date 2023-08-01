import { useEffect, useState } from "react";

import { Grid, TextField, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";

import Product from "../../components/Product";
import SignInPopUp from "../../components/SignInPopUp";
import { setProducts } from "../../redux/reducers/product.reducer";
import { RootState } from "../../redux/store";
import {
  getAllProductsByStatus,
  getAllProductsByStatusBySellerId,
} from "../../services/product.Api";

const HomeScreen = () => {
  const { products, action } = useSelector((state: RootState) => state.product);
  const { userInfo, token } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();
  const [SearchText, setSearchText] = useState("");
  useEffect(() => {
    // if role === seller, only shoe seller's products
    if (userInfo?.role === "seller" || action.loading) {
      getAllProductsByStatusBySellerId(token!).then((response) => {
        dispatch(setProducts(response.products));
      });
    } else {
      getAllProductsByStatus().then((response) => {
        dispatch(setProducts(response.products));
      });
    }
  }, [action.loading, userInfo?.role]);

  return (
    <div
      style={{
        padding: "20px 0",
        height: "100%",
      }}
    >
      <TextField
        style={{
          borderRadius: "20px",
          width: "50%",
          marginBottom: "30px ",
        }}
        variant="outlined"
        placeholder="Search by Title"
        onChange={(e) => setSearchText(e.target.value)}
      />
      {products.length > 0 && (
        <Grid container gap={"10px"}>
          {SearchText
            ? products
                .filter((item) =>
                  item.name.toLowerCase().includes(SearchText.toLowerCase()),
                )
                .map((product: any) => (
                  <Grid item margin={"10px"}>
                    <Product product={product} />
                  </Grid>
                ))
            : products.map((product: any) => (
                <Grid item margin={"10px"}>
                  <Product product={product} />
                </Grid>
              ))}
        </Grid>
      )}
      {!products.length && (
        <Grid
          container
          gap={"10px"}
          justifyContent={"center"}
          alignContent={"center"}
          flexDirection={"column"}
        >
          {userInfo?.role === "seller" ? (
            <Typography textAlign={"center"} component={"h3"}>
              Add products to display
            </Typography>
          ) : (
            <Typography textAlign={"center"} component={"h3"}>
              No products to display
            </Typography>
          )}

          <div>
            <img
              height={"500px"}
              width={"auto"}
              src={require("../../images/AddProduct.jpg")}
              alt="Sign In"
            />
          </div>
        </Grid>
      )}
      <SignInPopUp />
    </div>
  );
};

export default HomeScreen;
