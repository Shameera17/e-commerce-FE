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
import { Link, useLocation, useNavigate } from "react-router-dom";

import {
  manageModal,
  setCredentials,
  setToken,
} from "../../redux/reducers/auth.reducer";
import { RootState } from "../../redux/store";
import { login } from "../../services/authApi";
import { FormSchema } from "./FormSchema";
import "./styles.css";

// Import the CSS file for styling (see below)

const SignIn = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const { control, handleSubmit } = useForm({
    resolver: yupResolver(FormSchema),
    mode: "onChange",
  });
  const { enqueueSnackbar } = useSnackbar();

  const { userInfo, action } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    // navigate to home screen, when user sign in
    if (userInfo) navigate("/");
  }, [navigate, userInfo]);

  const onSubmit = async (data: any) => {
    await login(data)
      .then((res) => {
        dispatch(setCredentials({ ...res.data }));
        dispatch(setToken({ token: res.token }));
      })
      .then(() => {
        if (location.pathname === "/") {
          dispatch(manageModal());
        } else {
          navigate("/");
        }
      })
      .catch((err) => {
        enqueueSnackbar(err?.response?.data?.message || err?.error || err, {
          variant: "warning",
          anchorOrigin: {
            horizontal: "right",
            vertical: "top",
          },
        });
      });
  };

  return (
    <div className="signin-container">
      <div className="signin-image">
        <img src={require("../../images/login.jpg")} alt="Sign In" />
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
            {action.loading ? (
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
