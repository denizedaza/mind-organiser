import React, { ReactNode } from "react";
import NavBar from "./navbar";

type Props = {
  children: React.ReactNode;
  title?: string;
};

function Layout({ children }: Props) {
  return (
    <>
      <NavBar />
      <main>{children}</main>
    </>
  );
}

export default Layout;
