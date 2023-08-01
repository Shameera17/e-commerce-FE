import { useRef, useState } from "react";

import { yupResolver } from "@hookform/resolvers/yup";
import { Card, CardMedia, Grid, TextField } from "@mui/material";
import { useSnackbar } from "notistack";
import { Controller, useForm } from "react-hook-form";
import { useSelector } from "react-redux";

import PageHeading from "../../../components/PageHeading";
import { RootState } from "../../../redux/store";
import { createProduct } from "../../../services/product.Api";
import imageProcess from "../../../utils/imageProcess";
import { FormSchema } from "./FormSchema";

const CreateProduct = () => {
  const { token, userInfo } = useSelector((state: RootState) => state.auth);
  const { enqueueSnackbar } = useSnackbar();
  const fileInputRef = useRef(null);
  const [product, setProduct] = useState({
    file: "",
    flag: false,
  });
  const { control, handleSubmit, setValue, reset } = useForm({
    resolver: yupResolver(FormSchema),
    mode: "onChange",
    defaultValues: {
      name: "",
      quantity: "",
      price: "",
    },
  });
  const handleFileUpload = async (e: any) => {
    const file = e.target.files[0];
    const base64: any = await imageProcess(file);

    setProduct({ ...product, flag: true, file: base64 });
  };

  const onSubmit = (data: any) => {
    const dataObj = {
      ...data,
      imageFile: product.file,
      sellerId: userInfo?._id,
    };
    if (!product.file) {
    } else {
      createProduct(dataObj, token!)
        .then((response) => {
          enqueueSnackbar("Success", {
            variant: "success",
            anchorOrigin: {
              horizontal: "right",
              vertical: "top",
            },
          });
          reset();
          setProduct({ file: "", flag: false });
          if (fileInputRef.current) {
            fileInputRef.current = null; // Reset the file input value to clear the selection
          }
        })
        .catch((err) => {
          enqueueSnackbar(err?.response?.data?.message || err, {
            variant: "warning",
            anchorOrigin: {
              horizontal: "right",
              vertical: "top",
            },
          });
        });
    }
  };

  return (
    <>
      <PageHeading heading="Create Product" />
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container xs={8} gap={"20px"} justifyContent={"space-between"}>
          <Grid item xs={12}>
            <Controller
              name={"name"}
              control={control}
              render={({ field, fieldState: { invalid, error } }) => {
                return (
                  <TextField
                    {...field}
                    fullWidth
                    label="Name"
                    size="small"
                    value={field.value}
                    helperText={error?.message}
                    error={invalid}
                  />
                );
              }}
            />
          </Grid>
          <Grid item xs={5.5}>
            <Controller
              name={"price"}
              control={control}
              render={({ field, fieldState: { invalid, error } }) => {
                return (
                  <TextField
                    fullWidth
                    value={field.value}
                    helperText={error?.message}
                    label={"Price"}
                    error={invalid}
                    size="small"
                    type="text"
                    placeholder="0.00"
                    inputProps={{
                      inputMode: "numeric",
                      pattern: "[0-9.]*",
                      maxLength: 10,
                    }}
                    onChange={(e) => {
                      setValue("price", e.target.value.replace(/[^0-9.]/g, ""));
                    }}
                  />
                );
              }}
            />
          </Grid>
          <Grid item xs={5.5}>
            <Controller
              name={"quantity"}
              control={control}
              render={({ field, fieldState: { invalid, error } }) => {
                return (
                  <TextField
                    fullWidth
                    value={field.value}
                    size="small"
                    label="Quantity"
                    helperText={error?.message}
                    placeholder="0"
                    error={invalid}
                    type="text"
                    inputProps={{
                      inputMode: "numeric", // This will set the input mode to numeric for mobile devices
                      pattern: "[0-9]*", // This pattern allows only numeric characters (0-9)
                      maxLength: 10, // Optionally, set a maximum length for the input (adjust as needed)
                    }}
                    onChange={(e) => {
                      setValue(
                        "quantity",
                        e.target.value.replace(/[^0-9]/g, ""),
                      );
                    }}
                  />
                );
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              size="small"
              label="Image File"
              type="file"
              ref={fileInputRef}
              inputProps={{
                accept: "image/*", // This will only accept image files
              }}
              onChange={handleFileUpload}
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
          <Grid item xs={12}>
            <Card sx={{ maxWidth: 200, maxHeight: 200 }}>
              <CardMedia
                sx={{ height: 200, objectFit: "cover" }}
                image={product.file || require("../../../images/NoImage.jpg")}
                title="green iguana"
              />
            </Card>
          </Grid>
          <div
            style={{
              display: "flex",
              width: "100%",
              gap: "20px",
            }}
          >
            <button type="submit">Submit</button>
            {product.flag && (
              <button onClick={() => setProduct({ file: "", flag: false })}>
                Reset
              </button>
            )}
          </div>
        </Grid>
      </form>
    </>
  );
};

export default CreateProduct;
