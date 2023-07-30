import * as yup from "yup";

export const FormSchema = yup.object().shape({
  email: yup
    .string()
    .email("Must be a valid email address")
    .required("Email is required"),

  password: yup.string().required("Password is required").min(4).max(20),
});
