import { memo } from "react";

const layout = memo<{ children: React.ReactNode }>(({ children }) => {
  return <div className="container mx-auto p-4">{children}</div>;
});
layout.displayName = 'Layout';

export default layout;
