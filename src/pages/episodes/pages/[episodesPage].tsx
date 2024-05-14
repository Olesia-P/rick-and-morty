import React from "react";
import { useRouter } from "next/router";
import { useGetEpisodesOnePageQuery } from "../../../store/modules/api-slice";
import { List } from "../../../components/list/list";
import css from "../../../styles/page-styles/episodes-page.module.scss";
import { PagesNavigationArrows } from "../../../components/pages-navigation-arrows/pages-navigation-arrows";
import { PageTitle } from "../../../components/page-title/page-title";
import {
  parseErrorMessage,
  parseErrorStatus,
  turnPageIntoNumber,
} from "../../../utils/functions";

export default function EpisodesPage() {
  const router = useRouter();
  const { episodesPage } = router.query;
  const {
    data: episodesPageData = {},
    error,
    isError,
  } = useGetEpisodesOnePageQuery(episodesPage);

  const currentPage = turnPageIntoNumber(episodesPage);

  const parsedErrorStatus = parseErrorStatus(error);
  const parsedErrorMessage = parseErrorMessage(error);

  return (
    <>
      <article className={css.container}>
        <div className={css.title}>
          <PageTitle text="Episodes" />
        </div>

        <section className={css.list}>
          {typeof currentPage !== "undefined" &&
            Object.keys(episodesPageData).length !== 0 && (
              <div className={css.arrowsWrapper}>
                <PagesNavigationArrows
                  currentPage={currentPage}
                  numberOfPages={episodesPageData.info.pages}
                  baseUrl="/episodes/pages/"
                />
              </div>
            )}

          {!isError && Object.keys(episodesPageData).length !== 0 && (
            <List data={episodesPageData} type="episodes" />
          )}

          {typeof currentPage !== "undefined" &&
            Object.keys(episodesPageData).length !== 0 && (
              <div className={css.arrowsWrapper}>
                <PagesNavigationArrows
                  currentPage={currentPage}
                  numberOfPages={episodesPageData.info.pages}
                  baseUrl="/episodes/pages/"
                />
              </div>
            )}
        </section>

        {isError && (
          <aside className={css.error}>
            <h2 className={css.errorMessage}>
              {parsedErrorStatus} {parsedErrorMessage}
            </h2>
          </aside>
        )}
      </article>
    </>
  );
}
