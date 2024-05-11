import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
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
    } else {
      router.push(`${baseUrl}` + "1");
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
      <span
        onClick={() => {
          moveToPrevPage(numberOfPages, currentPage, baseUrl);
        }}
      >
        {" "}
        arrow{" "}
      </span>

      {pagesToShow.map((element) => (
        <span
          key={(Math.random() * 100000).toFixed(0)}
          className={cx(
            css.pageNumber,
            element === currentPage && css.currentPage,
            element === 0 && css.displayNone
          )}
          onClick={() => handlePageClick(numberOfPages, element, baseUrl)}
        >
          {element}
        </span>
      ))}

      <span
        onClick={() => {
          moveToNextPage(numberOfPages, currentPage, baseUrl);
        }}
      >
        {" "}
        arrow{" "}
      </span>
    </div>
  );
};
