'use client';

import React from 'react';
import css from '../../../../styles/page-styles/episodes-page.module.scss';
import { useGetEpisodesOnePageQuery } from '@/store/modules/api-slice';
import { parseErrorMessage, parseErrorStatus } from '@/utils/functions';
import { PageTitle } from '@/components/page-ui-related/page-title/page-title';
import { Pagination } from '@/components/pagination/pagination';
import { List } from '@/components/list/list';

export default function EpisodesPage({
  params,
}: {
  params: { episodesPageId: string };
}) {
  const { episodesPageId } = params;
  const {
    data: episodesPageData,
    error,
    isError,
  } = useGetEpisodesOnePageQuery(episodesPageId);

  const currentPage = +episodesPageId;

  const parsedErrorStatus = parseErrorStatus(error);
  const parsedErrorMessage = parseErrorMessage(error);

  return (
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
  );
}
