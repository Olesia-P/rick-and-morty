import React from "react";
import css from "./pagination.module.scss";
import { PagesNavigationArrows } from "./pages-navigation-arrows/pages-navigation-arrows";

type PaginationProps = {
  children: React.ReactNode;
  currentPage: number;
  numberOfPages: number;
  baseUrl: string;
};

export const Pagination = ({
  children,
  currentPage,
  numberOfPages,
  baseUrl,
}: PaginationProps) => {
  return (
    <>
      <div className={css.arrowsWrapper}>
        <PagesNavigationArrows
          currentPage={currentPage}
          numberOfPages={numberOfPages}
          baseUrl={baseUrl}
        />
      </div>
      {children}
      <div className={css.arrowsWrapper}>
        <PagesNavigationArrows
          currentPage={currentPage}
          numberOfPages={numberOfPages}
          baseUrl={baseUrl}
        />
      </div>
    </>
  );
};
