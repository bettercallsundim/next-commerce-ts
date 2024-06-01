import Product from "@/app/components/Product";
import type { Metadata } from "next";
export async function generateMetadata({ params }): Promise<Metadata> {
  const { data } = await getProduct(params.productId);

  return {
    title: data.name,
    // openGraph: {
    //   images: ['/some-specific-page-image.jpg', ...previousImages],
    // },
  };
}
async function getProduct(id) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND}/product/${id}`);
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
}
export default async function page({ params }) {
  const { data } = await getProduct(params.productId);
  return <Product product={data} />;
}
