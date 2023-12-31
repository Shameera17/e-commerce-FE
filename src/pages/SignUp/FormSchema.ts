import * as yup from "yup";

export const FormSchema = yup.object().shape({
  name: yup
    .string()
    .required("Name is required")
    .matches(/^[a-zA-Z ]*$/, "error")
    .strict(),
  email: yup
    .string()
    .email("Must be a valid email address")
    .required("Email is required"),
  password: yup.string().required("Password is required").min(4).max(20).trim(),
  confPassword: yup
    .string()
    .required("Confirm password is required")
    .oneOf([yup.ref("password")], "Password dont match"),
  role: yup
    .string()
    .email("Must be a valid email address")
    .required("Role is required")
    .trim(),
});
