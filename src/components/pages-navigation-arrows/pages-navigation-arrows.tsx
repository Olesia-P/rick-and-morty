import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { MdArrowForwardIos } from "react-icons/md";
import cx from "classnames";
import css from "./pages-navigarion-arrows.module.scss";

type PagesNavigationArrowsProps = {
  currentPage: number;
  numberOfPages: number;
  baseUrl: string;
};

export const PagesNavigationArrows = ({
  currentPage,
  numberOfPages,
  baseUrl,
}: PagesNavigationArrowsProps) => {
  // remember to add style if arrow cant be clicked
  const router = useRouter();
  const [page1, setPage1] = useState(0);
  const [page2, setPage2] = useState(0);
  const [page3, setPage3] = useState(0);
  const [firstPage, setFirstPage] = useState(0);
  const [lastPage, setLastPage] = useState(0);

  const pagesToShow = [firstPage, page1, page2, page3, lastPage];

  const decidePages = (currentPage: number, numberOfPages: number): void => {
    if (numberOfPages <= 3 || (numberOfPages > 4 && currentPage === 1)) {
      setPage1(1);
      setPage2(2);
      setPage3(3);
      setFirstPage(0);
    }

    if (numberOfPages > 4) {
      if (currentPage > 1 && currentPage + 1 < numberOfPages) {
        setPage1(currentPage - 1);
        setPage2(currentPage);
        setPage3(currentPage + 1);
      } else if (currentPage === numberOfPages) {
        setPage1(currentPage - 2);
        setPage2(currentPage - 1);
        setPage3(currentPage);
        setLastPage(0);
      }
    }
  };

  const decideFurthermostPages = (
    currentPage: number,
    numberOfPages: number
  ): void => {
    if (numberOfPages > 4) {
      if (currentPage <= 3) {
        setLastPage(numberOfPages);
      } else if (currentPage > 3 && currentPage !== numberOfPages) {
        setFirstPage(1);
        setLastPage(numberOfPages);
      } else if (currentPage >= currentPage - 2) {
        setFirstPage(1);
      }
    }
  };

  const moveToNextPage = (
    numberOfPages: number,
    currentPage: number,
    baseUrl: string
  ): void => {
    if (currentPage < numberOfPages && currentPage >= 1) {
      const nextPage = currentPage + 1;
      router.push(`${baseUrl}` + `${nextPage}`);
    }
  };

  const moveToPrevPage = (
    numberOfPages: number,
    currentPage: number,
    baseUrl: string
  ): void => {
    if (currentPage <= numberOfPages && currentPage > 1) {
      const prevPage = currentPage - 1;
      router.push(`${baseUrl}` + `${prevPage}`);
    }
  };

  const handlePageClick = (
    numberOfPages: number,
    thisPage: number,
    baseUrl: string
  ) => {
    if (thisPage <= numberOfPages && thisPage >= 1) {
      router.push(`${baseUrl}` + `${thisPage}`);
    }
  };

  useEffect(() => {
    decidePages(currentPage, numberOfPages);
    decideFurthermostPages(currentPage, numberOfPages);
  }, [currentPage, numberOfPages]);

  return (
    <div className={css.pagesNavigation}>
      <i
        onClick={() => {
          moveToPrevPage(numberOfPages, currentPage, baseUrl);
        }}
        className={cx(css.leftArrow, currentPage === 1 && css.noClick)}
      >
        <MdArrowForwardIos />
      </i>

      {pagesToShow.map((element) => (
        <span
          key={(Math.random() * 100000).toFixed(0)}
          className={cx(
            css.pageNumber,
            element === currentPage && css.currentPage,
            element === 0 && css.displayNone,
            element === firstPage && css.firstPage,
            element === lastPage && css.lastPage
          )}
          onClick={() => handlePageClick(numberOfPages, element, baseUrl)}
        >
          {element}
        </span>
      ))}

      <i
        onClick={() => {
          moveToNextPage(numberOfPages, currentPage, baseUrl);
        }}
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
