import React, { useEffect } from "react";

import { yupResolver } from "@hookform/resolvers/yup";
import {
  Button,
  CircularProgress,
  FormControlLabel,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from "@mui/material";
import { useSnackbar } from "notistack";
import { Controller, useForm } from "react-hook-form";
// Replace with your actual image URL
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import SignUpImage from "../../images/signup.jpg";
import { RootState } from "../../store/configureStore";
import { setCredentials, setToken } from "../../store/slices/auth.slice";
import { useRegisterMutation } from "../../store/slices/usersApi.slice";
import { FormSchema } from "./FormSchema";
import "./styles.css";

// Import the CSS file for styling (see below)

const SignUp: React.FC = () => {
  const { userInfo } = useSelector((state: RootState) => state.auth);
  const { control, handleSubmit, getValues, trigger } = useForm({
    resolver: yupResolver(FormSchema),
    mode: "all",
    defaultValues: {
      role: "buyer",
      name: "",
      email: "",
      password: "",
      confPassword: "",
    },
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  const [register, { isLoading }] = useRegisterMutation();

  const onSubmit = async (data: any) => {
    console.log(data);
    try {
      const res: any = await register(data).unwrap();
      // Save the token in localStorage
      dispatch(setCredentials({ ...res.data }));
      // Save the token in Redux
      dispatch(setToken({ token: res.token }));

      navigate("/");
    } catch (err: any) {
      enqueueSnackbar(err?.data?.message || err?.error || err, {
        variant: "warning",
        anchorOrigin: {
          horizontal: "right",
          vertical: "top",
        },
      });
      console.log(err?.data.message || err.error || err);
    }
  };

  useEffect(() => {
    // navigate to home screen, when user sign in
    if (userInfo) navigate("/");
  }, [navigate, userInfo]);
  return (
    <div className="signup-container">
      <div className="signup-image">
        <img src={SignUpImage} alt="Sign Up" />
      </div>
      <div className="signup-form-container">
        <h1>Sign Up</h1>
        <form
          className="signup-form"
          noValidate
          onSubmit={handleSubmit(onSubmit)}
        >
          <Controller
            name={"name"}
            control={control}
            render={({ field, fieldState: { invalid, error } }) => {
              return (
                <TextField
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
                  {...field}
                  helperText={error?.message}
                  error={invalid}
                  placeholder="Password"
                  label={field.value ? "Password" : ""}
                />
              );
            }}
          />
          <Controller
            name={"confPassword"}
            control={control}
            render={({ field, fieldState: { invalid, error } }) => {
              return (
                <TextField
                  {...field}
                  helperText={error?.message}
                  error={invalid}
                  placeholder="Confirm Password"
                  label={field.value ? "Confirm Password" : ""}
                />
              );
            }}
          />
          <Typography component="p">Sign up as: </Typography>{" "}
          <Controller
            name="role"
            control={control}
            render={({ field }) => (
              <RadioGroup placeholder="Sign up as: " {...field} row>
                <FormControlLabel
                  value="buyer"
                  control={<Radio />}
                  label="Buyer"
                />
                <FormControlLabel
                  value="seller"
                  control={<Radio />}
                  label="Seller"
                />
              </RadioGroup>
            )}
          />
          <Button
            variant="contained"
            onClick={async () => {
              const validated = await trigger();
              if (!validated) {
                const values = getValues();
                onSubmit(values!);
              }
            }}
          >
            {isLoading ? (
              <CircularProgress size={24} color="inherit" />
            ) : (
              `Sign Up`
            )}
          </Button>
          <div
            style={{
              display: "flex",
              gap: "5px",
            }}
          >
            <Typography component="p">Have an account? </Typography>{" "}
            <Link to={"/signin"}>Sign in</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
