import { useEffect, useState } from "react";

import { yupResolver } from "@hookform/resolvers/yup";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Button,
  CircularProgress,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import { useSnackbar } from "notistack";
import { Controller, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import SignInImage from "../../images/login.jpg";
import { setCredentials } from "../../store/slices/auth.slice";
import { useLoginMutation } from "../../store/slices/usersApi.slice";
import { FormSchema } from "./FormSchema";
import "./styles.css";

// Import the CSS file for styling (see below)

const SignIn = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { control, handleSubmit } = useForm({
    resolver: yupResolver(FormSchema),
    mode: "onChange",
  });
  const { enqueueSnackbar } = useSnackbar();
  const [login, { isLoading }] = useLoginMutation();
  // if user info available, then user has already logged in
  const { userInfo } = useSelector((state: any) => state.auth);

  useEffect(() => {
    // navigate to home screen, when user sign in
    if (userInfo) navigate("/");
  }, [navigate, userInfo]);

  const onSubmit = async (data: any) => {
    try {
      const res = await login(data).unwrap();
      dispatch(setCredentials({ ...res.data }));
      navigate("/");
    } catch (err: any) {
      enqueueSnackbar(err?.data.message || err.error, {
        variant: "warning",
        anchorOrigin: {
          horizontal: "right",
          vertical: "top",
        },
      });
      console.log(err?.data.message || err.error);
    }
  };

  return (
    <div className="signin-container">
      <div className="signin-image">
        <img src={SignInImage} alt="Sign In" />
      </div>
      <div className="signin-form-container">
        <h1>Sign In</h1>
        <form className="signin-form" onSubmit={handleSubmit(onSubmit)}>
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

          <Button type="submit" variant="contained">
            {isLoading ? (
              <CircularProgress size={24} color="inherit" />
            ) : (
              `Sign In`
            )}
          </Button>
          <div
            style={{
              display: "flex",
              gap: "5px",
            }}
          >
            <Typography component="p">Do not have an account? </Typography>{" "}
            <Link to={"/signup"}>Sign Up</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
