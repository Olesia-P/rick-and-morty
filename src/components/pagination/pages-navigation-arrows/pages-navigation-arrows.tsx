import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { MdArrowForwardIos } from "react-icons/md";
import cx from "classnames";
import css from "./pages-navigation-arrows.module.scss";

type PagesNavigationArrowsProps = {
  currentPage: number;
  numberOfPages: number;
  baseUrl: string;
};

type PageItem = {
  number: number;
  status: "current page" | "main page" | "first page" | "last page";
};

export const PagesNavigationArrows = ({
  currentPage,
  numberOfPages,
  baseUrl,
}: PagesNavigationArrowsProps) => {
  const router = useRouter();
  const [pagesToShow, setPagesToShow] = useState<PageItem[]>([]);

  const generatePages = (
    currentPage: number,
    numberOfPages: number
  ): PageItem[] => {
    let pages: PageItem[] = [];

    if (numberOfPages <= 3) {
      for (let i = 1; i <= numberOfPages; i++) {
        pages.push({
          number: i,
          status: i === currentPage ? "current page" : "main page",
        });
      }
      return pages;
    }

    if (currentPage > 2) {
      pages.push({ number: 1, status: "first page" });
    }

    const mainPages: PageItem[] = [
      { number: currentPage - 1, status: "main page" as const },
      { number: currentPage, status: "current page" as const },
      { number: currentPage + 1, status: "main page" as const },
    ].filter((page) => page.number > 0 && page.number <= numberOfPages);

    pages = pages.concat(mainPages);

    if (currentPage + 1 < numberOfPages) {
      pages.push({ number: numberOfPages, status: "last page" });
    }

    return pages;
  };

  useEffect(() => {
    setPagesToShow(generatePages(currentPage, numberOfPages));
  }, [currentPage, numberOfPages]);

  const handleNavigation = (page: number) => {
    if (page > 0 && page <= numberOfPages) {
      router.push(`${baseUrl}${page}`);
    }
  };

  return (
    <div className={css.pagesNavigation}>
      <i
        onClick={() => handleNavigation(currentPage - 1)}
        className={cx(css.leftArrow, currentPage === 1 && css.noClick)}
      >
        <MdArrowForwardIos />
      </i>

      {pagesToShow.map(({ number, status }) => (
        <span
          key={number}
          className={cx(
            css.pageNumber,
            status === "current page" && css.currentPage,
            status === "first page" && css.firstPage,
            status === "last page" && css.lastPage
          )}
          onClick={() => handleNavigation(number)}
        >
          {number}
        </span>
      ))}

      <i
        onClick={() => handleNavigation(currentPage + 1)}
        className={cx(
          css.rightArrow,
          currentPage === numberOfPages && css.noClick
        )}
      >
        <MdArrowForwardIos />
      </i>
    </div>
  );
};
