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
  const router = useRouter();
  const [page1, setPage1] = useState(0);
  const [page2, setPage2] = useState(0);
  const [page3, setPage3] = useState(0);
  const [firstPage, setFirstPage] = useState(0);
  const [lastPage, setLastPage] = useState(0);

  // console.log("page1", page1);
  // console.log("page2", page2);
  // console.log("page3", page3);
  // console.log("firstPage", firstPage);
  // console.log("lastPage", lastPage);
  // console.log("currentPage", currentPage);
  // console.log("numberOfPages", numberOfPages);

  const pagesToShow = [firstPage, page1, page2, page3, lastPage];

  const decidePages = (currentPage: number, numberOfPages: number): void => {
    if (numberOfPages === 3) {
      setPage1(1);
      setPage2(2);
      setPage3(3);
      setFirstPage(0);
      setLastPage(0);
    }
    if (numberOfPages === 2) {
      setPage1(1);
      setPage2(2);
      setPage3(0);
      setFirstPage(0);
      setLastPage(0);
    }
    if (numberOfPages === 1) {
      setPage1(1);
      setPage2(0);
      setPage3(0);
      setFirstPage(0);
      setLastPage(0);
    }

    if (numberOfPages > 4) {
      if (currentPage === 1) {
        setPage1(1);
        setPage2(2);
        setPage3(3);
        setLastPage(numberOfPages);
        setFirstPage(0);
      } else if (currentPage > 2 && currentPage + 2 < numberOfPages) {
        setPage1(currentPage - 1);
        setPage2(currentPage);
        setPage3(currentPage + 1);
        setLastPage(numberOfPages);
        setFirstPage(1);
      } else if (numberOfPages - 1 === currentPage) {
        setPage1(currentPage - 1);
        setPage2(currentPage);
        setPage3(currentPage + 1);
        setLastPage(0);
        setFirstPage(1);
      } else if (currentPage === numberOfPages) {
        setPage1(currentPage - 2);
        setPage2(currentPage - 1);
        setPage3(currentPage);
        setLastPage(0);
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
