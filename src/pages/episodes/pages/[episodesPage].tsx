import React from "react";
import { useRouter } from "next/router";
import { useGetEpisodesOnePageQuery } from "../../../store/modules/api-slice";
import { List } from "../../../components/list/list";
import css from "../../../styles/page-styles/episodes-page.module.scss";
import { PageTitle } from "../../../components/page-title/page-title";
import {
  parseErrorMessage,
  parseErrorStatus,
  turnPageIntoNumber,
} from "../../../utils/functions";
import { Pagination } from "../../../components/pagination/pagination";

export default function EpisodesPage() {
  const router = useRouter();
  const { episodesPage } = router.query;
  const {
    data: episodesPageData,
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
        {currentPage && episodesPageData && !isError && (
          <section className={css.list}>
            <Pagination
              currentPage={currentPage}
              numberOfPages={episodesPageData.info.pages}
              baseUrl="/episodes/pages/"
            >
              <List data={episodesPageData} type="episodes" />
            </Pagination>
          </section>
        )}

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
