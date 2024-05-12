import React from "react";
import css from "./page-title.module.scss";

type PageTitleProps = {
  text: string;
};

export const PageTitle = ({ text }: PageTitleProps) => {
  return <h2 className={css.container}>{text}</h2>;
};
