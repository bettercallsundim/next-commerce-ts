"use client";
import { useRouter } from "next/navigation";

type Props = {};

const Dashboard = (props: Props) => {
  const router = useRouter();

  return (
    <div className="grid grid-cols-4 grid-rows-1 items-center justify-center place-items-center mt-16">
      <div
        onClick={() => {
          router.push("/dashboard/categories");
        }}
        className="categories bg-secondary p-20 rounded-lg text-3xl cursor-pointer"
      >
        Categories
      </div>
      <div
        onClick={() => {
          router.push("/dashboard/orders");
        }}
        className="orders bg-secondary p-20 rounded-lg text-3xl cursor-pointer"
      >
        Orders
      </div>
      <div
        onClick={() => {
          router.push("/dashboard/products");
        }}
        className="products bg-secondary p-20 rounded-lg text-3xl cursor-pointer"
      >
        Products
      </div>
      <div
        onClick={() => {
          router.push("/dashboard/customers");
        }}
        className="customers bg-secondary p-20 rounded-lg text-3xl cursor-pointer"
      >
        Customers
      </div>
    </div>
  );
};

export default Dashboard;
