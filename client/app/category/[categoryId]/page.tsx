import Breadcrumb from "@/app/components/Breadcrumb";
import Card2 from "@/app/components/Card2";
import Container from "@/app/components/Container";
import type { Metadata } from "next";
// export async function generateMetadata({ params }): Promise<Metadata> {
//   const { data } = await getCategoryData(params.productId);

//   return {
//     title: data.name,
//     // openGraph: {
//     //   images: ['/some-specific-page-image.jpg', ...previousImages],
//     // },
//   };
// }
async function getCategoryData(id) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND}/category/${id}/childrens`
  );
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
}
async function getProductsByCategory(id) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND}/product/all/${id}`
  );
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
}
export default async function page({ params }) {
  const categoryDataFn = getCategoryData(params.categoryId);
  const productsByCategoryFn = getProductsByCategory(params.categoryId);
  const [categoryData, productsByCategory] = await Promise.all([
    categoryDataFn,
    productsByCategoryFn,
  ]);
  console.log([JSON.stringify(categoryData, null, 2), productsByCategory]);
  return (
    <Container>
      <Breadcrumb categories={categoryData.breadcrumbs} />
      <h1>Just For You</h1>
      <div className="bg-secondary px-8 py-12 grid  grid-cols-2 md:grid-cols-5 gap-4">
        {productsByCategory?.data?.map((product, ind) => (
          <Card2 key={ind} product={product} />
        ))}
      </div>
    </Container>
  );
}
