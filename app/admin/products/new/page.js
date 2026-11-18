import ProductFormClient from "../ProductFormClient";

export const metadata = { title: "Add Product — Admin" };

export default function NewProductPage() {
  return <ProductFormClient mode="create" />;
}
