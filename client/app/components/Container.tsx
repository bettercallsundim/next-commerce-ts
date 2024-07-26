import React from "react";

type Props = {
  children: React.ReactNode;
  className?: string;
};

const Container = ({ children, className }: Props) => {
  return (
    <div className={`container mx-auto py-4 px-8 ${className}`}>{children}</div>
  );
};

export default Container;
