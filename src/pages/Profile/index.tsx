import { useState } from "react";

import { yupResolver } from "@hookform/resolvers/yup";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Avatar,
  Button,
  CircularProgress,
  Grid,
  IconButton,
  InputAdornment,
  TextField,
} from "@mui/material";
import { enqueueSnackbar } from "notistack";
import { Controller, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import PageHeading from "../../components/PageHeading";
import { setCredentials, setToken } from "../../redux/reducers/auth.reducer";
import { RootState } from "../../redux/store";
import { updateUser } from "../../services/authApi";
import { FormSchema } from "./FormSchema";

const Profile = () => {
  const { userInfo, token, action } = useSelector(
    (state: RootState) => state.auth,
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const { control, getValues, trigger } = useForm({
    resolver: yupResolver(FormSchema),
    mode: "all",
    defaultValues: {
      name: userInfo?.name ?? "",
      email: userInfo?.email ?? "",
      password: "",
    },
  });

  const onSubmit = async (data: any) => {
    token &&
      updateUser(data, token)
        .then((response) => {
          // Save the token in localStorage
          dispatch(setCredentials({ ...response.data }));
          // Save the token in Redux
          dispatch(setToken({ token: response.token }));

          navigate("/");
        })
        .catch((err) => {
          enqueueSnackbar(err?.data?.message || err?.error || err, {
            variant: "warning",
            anchorOrigin: {
              horizontal: "right",
              vertical: "top",
            },
          });
        });
  };

  return (
    <>
      <PageHeading heading="Profile" />

      <Avatar
        sx={{ width: 100, height: 100, marginBottom: "30px" }}
        alt={userInfo?.name}
      />

      {/* Add other profile information as needed */}
      <Grid
        direction={"column"}
        container
        gap={"20px"}
        columnSpacing={{ xs: 1, sm: 2, md: 2 }}
        xs={7}
      >
        <Controller
          name={"name"}
          control={control}
          render={({ field, fieldState: { invalid, error } }) => {
            return (
              <TextField
                fullWidth
                {...field}
                helperText={error?.message}
                error={invalid}
                placeholder="Name"
                label={field.value ? "Name" : ""}
              />
            );
          }}
        />
        <Controller
          name={"email"}
          control={control}
          render={({ field, fieldState: { invalid, error } }) => {
            return (
              <TextField
                {...field}
                helperText={error?.message}
                error={invalid}
                placeholder="Email Address"
                label={field.value ? "Email Address" : ""}
              />
            );
          }}
        />
        <Controller
          name={"password"}
          control={control}
          render={({ field, fieldState: { invalid, error } }) => {
            return (
              <TextField
                type={showPassword ? "text" : "password"}
                {...field}
                helperText={error?.message}
                error={invalid}
                placeholder="Password"
                label={field.value ? "Password" : ""}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => {
                          setShowPassword(!showPassword);
                        }}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            );
          }}
        />
        <TextField
          disabled
          label={"Role"}
          value={userInfo?.role === "buyer" ? "Buyer" : "Seller"}
        />
        <Button
          style={{
            width: "100px",
          }}
          variant="contained"
          onClick={async () => {
            const validated = await trigger();
            if (!validated) {
              const values = getValues();
              onSubmit(values!);
            }
          }}
        >
          {action.loading ? (
            <CircularProgress size={24} color="inherit" />
          ) : (
            `Update`
          )}
        </Button>
      </Grid>
    </>
  );
};

export default Profile;
