import MobileNavbar from "@/components/navbar-mobile";
import React, { ReactNode } from "react";

const layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="p-4 mb-16">
      {children}
      <MobileNavbar />
    </div>
  );
};

export default layout;
