import React, { useEffect, useMemo, useState } from "react";
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
  isCurrent: boolean;
};

export const PagesNavigationArrows = ({
  currentPage,
  numberOfPages,
  baseUrl,
}: PagesNavigationArrowsProps) => {
  const router = useRouter();

  const navigateToPage = (page: number) => {
    if (page >= 1 && page <= numberOfPages && page !== currentPage) {
      const url = baseUrl.endsWith("/")
        ? `${baseUrl}${page}`
        : `${baseUrl}/${page}`;
      router.push(url);
    }
  };

  const isCurrentPageNearEnd = currentPage > numberOfPages - 4;
  const pages: PageItem[] = useMemo(() => {
    let pages: PageItem[] = [];
    let numbers: number[] = [];

    const addPage = (number: number) => {
      pages.push({
        number,
        isCurrent: number === currentPage,
      });
    };

    if (numberOfPages <= 5) {
      for (let i = 1; i <= numberOfPages; i++) {
        addPage(i);
      }
      return pages;
    }

    const addNumber = (number: number) => {
      if (number < 1 || number > numberOfPages) return;
      numbers.push(number);
    };

    addNumber(1);
    addNumber(currentPage - 1);
    addNumber(currentPage);
    addNumber(currentPage + 1);
    addNumber(numberOfPages);

    numbers = [...new Set(numbers)];

    if (numbers.length < 5) {
      if (isCurrentPageNearEnd) {
        for (let i = numberOfPages - 3; i <= numberOfPages; i++) {
          addNumber(i);
        }
      } else {
        for (let i = 1; i <= 4; i++) {
          addNumber(i);
        }
      }
    }

    numbers = [...new Set(numbers)];
    numbers.sort((a, b) => a - b);

    for (let i = 0; i < numbers.length; i++) {
      addPage(numbers[i]);
    }

    return pages;
  }, [currentPage, numberOfPages]);

  const showFirstEllipsis = currentPage > 3;
  const showLastEllipsis = currentPage < numberOfPages - 2;

  return (
    <nav className={css.pagesNavigation} aria-label="Pagination">
      <button
        onClick={() => navigateToPage(currentPage - 1)}
        className={cx(css.leftArrow, currentPage === 1 && css.noClick)}
        disabled={currentPage === 1}
        aria-label="Go to previous page"
      >
        <MdArrowForwardIos className={css.rotatedArrow} />
      </button>

      {pages.map((page) => (
        <button
          key={page.number}
          className={cx(
            css.pageNumber,
            page.isCurrent && css.currentPage,
            page.number === 1 && showFirstEllipsis && css.firstPage,
            page.number === numberOfPages && showLastEllipsis && css.lastPage
          )}
          onClick={() => navigateToPage(page.number)}
        >
          {page.number}
        </button>
      ))}

      <button
        onClick={() => navigateToPage(currentPage + 1)}
        className={cx(
          css.rightArrow,
          currentPage === numberOfPages && css.noClick
        )}
        disabled={currentPage === numberOfPages}
        aria-label="Go to next page"
      >
        <MdArrowForwardIos />
      </button>
    </nav>
  );
};
