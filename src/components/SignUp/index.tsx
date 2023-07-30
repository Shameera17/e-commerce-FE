import React from "react";

import { yupResolver } from "@hookform/resolvers/yup";
import { Button, TextField, Typography } from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { Link } from "react-router-dom";

import SignUpImage from "../../images/signup.jpg";
// Replace with your actual image URL
import { FormSchema } from "./FormSchema";
import "./styles.css";

// Import the CSS file for styling (see below)

const SignUp: React.FC = () => {
  const { control, handleSubmit, trigger } = useForm({
    resolver: yupResolver(FormSchema),
    mode: "all",
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confPassword: "",
    },
  });

  const onSubmit = (data: any) => {
    console.log("formData", data.errors);
  };
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
          <Button type="submit" variant="contained">
            Sign Up
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
