import FooterComponent from "@/components/FooterComponent/FooterComponent";
import NavbarContainers from "@/containers/NavbarContainers/NavbarContainers";
import React from "react";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <NavbarContainers />
      {children}
      <FooterComponent />
    </>
  );
};

export default layout;
