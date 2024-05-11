import React from "react";
import { useRouter } from "next/router";
import { useGetEpisodesOnePageQuery } from "../../../store/modules/api-slice";
import { List } from "../../../components/list/list";
import css from "../../../styles/page-styles/episodes-page.module.scss";
import { PagesNavigationArrows } from "../../../components/pages-navigation-arrows/pages-navigation-arrows";

export default function EpisodesPage() {
  const router = useRouter();
  const { episodesPage } = router.query;
  const {
    data: episodesPageData = {},
    error,
    isError,
    isLoading,
  } = useGetEpisodesOnePageQuery(episodesPage);

  const turnPageIntoNumber = (
    page: string | string[] | undefined
  ): number | undefined => {
    if (typeof page === "string") {
      return parseInt(page);
    } else {
      return undefined;
    }
  };

  const currentPage = turnPageIntoNumber(episodesPage);

  // console.log("EpisodesPageData", episodesPageData);
  return (
    <article className={css.container}>
      <h2 className={css.title}>Episodes</h2>
      <section className={css.list}>
        <List data={episodesPageData} type="episodes" />
        {typeof currentPage !== "undefined" &&
          Object.keys(episodesPageData).length !== 0 && (
            <PagesNavigationArrows
              currentPage={currentPage}
              numberOfPages={episodesPageData.info.pages}
              baseUrl="/episodes/pages/"
            />
          )}
      </section>
    </article>
  );
}
