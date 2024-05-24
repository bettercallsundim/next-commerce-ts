import Link from "next/link";
import React from "react";

type Props = {};

const Products = (props: Props) => {
  return (
    <div>
      <div>Products</div>
      <div>
        <Link href="/dashboard/products/create">Create Product</Link>
      </div>
    </div>
  );
};

export default Products;
