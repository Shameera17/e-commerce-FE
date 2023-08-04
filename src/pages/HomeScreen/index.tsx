import { useEffect, useState } from "react";

import { Grid, TextField, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";

import Loading from "../../components/Loading";
import Product from "../../components/Product";
import SignInPopUp from "../../components/SignInPopUp";
import {
  resetAction,
  setAction,
  setProducts,
} from "../../redux/reducers/product.reducer";
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
    dispatch(setAction({ loading: true, type: "fetchAll" }));
  }, []);

  useEffect(() => {
    if (action.loading || action.type !== null) {
      // if role === seller, only show seller's products
      if (userInfo?.role === "seller") {
        getAllProductsByStatusBySellerId(token!).then(async (response) => {
          dispatch(resetAction());

          dispatch(setProducts(response.products));
        });
      } else {
        getAllProductsByStatus().then(async (response) => {
          dispatch(resetAction());

          dispatch(setProducts(response.products));
        });
      }
    }
  }, [action.loading, action.type, userInfo?.role]);

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
      {action.loading ? (
        <Loading />
      ) : products.length < 1 && !action.loading ? (
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
      ) : undefined}
      <SignInPopUp />
    </div>
  );
};

export default HomeScreen;
