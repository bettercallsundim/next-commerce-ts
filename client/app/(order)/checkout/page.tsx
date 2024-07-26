import Container from "@/app/components/Container";
import React from "react";

type Props = {};

const page = (props: Props) => {
  return (
    <Container>
      <h1>Just For You</h1>
      <div className="bg-secondary px-8 py-12 grid  grid-cols-2 md:grid-cols-5 gap-4"></div>
    </Container>
  );
};

export default page;
