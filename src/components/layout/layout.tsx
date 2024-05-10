import React from "react";
import { Navbar } from "./navbar/navbar";
import { Footer } from "./footer/footer";
import css from "./layout.module.scss";

type LayoutProps = {
  children: React.ReactNode;
};

export const Layout = ({ children }: LayoutProps) => {
  return (
    <>
      <Navbar />
      <main className={css.main}>{children}</main>
      <Footer />
    </>
  );
};
