import ProductFormClient from "../ProductFormClient";

export const metadata = { title: "Edit Product — Admin" };

export default function EditProductPage({ params }) {
  return <ProductFormClient mode="edit" productId={params.id} />;
}
