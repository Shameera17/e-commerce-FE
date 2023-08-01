import * as yup from "yup";

export const FormSchema = yup.object().shape({
  name: yup.string().required("Product Name is required"),
  quantity: yup
    .string()
    .required("Quantity is required")
    .max(10)
    .matches(/^[1-9]\d*$/, "Value should be more than 0")
    .trim(),
  price: yup.string().required("Price is required").trim(),
});
