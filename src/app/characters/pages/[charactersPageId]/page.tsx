'use client';

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import css from '../../../../styles/page-styles/characters-page.module.scss';
import { useGetCharactersOnePageQuery } from '@/store/modules/api-slice';
import { CharactersState } from '@/types/types';
import { parseErrorMessage, parseErrorStatus } from '@/utils/functions';
import { changePage } from '@/store/modules/characters-slice';
import { PageTitle } from '@/components/page-ui-related/page-title/page-title';
import { CharactersInputs } from '@/components/characters-inputs/characters-inputs';
import { Pagination } from '@/components/pagination/pagination';
import { List } from '@/components/list/list';

export default function CharactersPage({
  params,
}: {
  params: { charactersPageId: string };
}) {
  const { charactersPageId } = params;
  const currentPage = +charactersPageId;

  const charactersParams = useSelector(
    (state: { characters: CharactersState }) =>
      state.characters.charactersParams,
  );
  const {
    data: charactersPageData,
    error,
    isError,
  } = useGetCharactersOnePageQuery(charactersParams);

  const dispatch = useDispatch();

  const parsedErrorStatus = parseErrorStatus(error);
  const parsedErrorMessage = parseErrorMessage(error);

  useEffect(() => {
    if (typeof charactersPageId === 'string') {
      dispatch(changePage(charactersPageId));
    }
  }, [charactersPageId]);

  return (
    <article className={css.container}>
      <div className={css.title}>
        <PageTitle text="Characters" />
      </div>
      {currentPage && !isError && charactersPageData && (
        <>
          <section className={css.inputs}>
            <CharactersInputs />
          </section>
          <section className={css.list}>
            <Pagination
              currentPage={currentPage}
              numberOfPages={charactersPageData.info.pages}
              baseUrl="/characters/pages/"
            >
              <List data={charactersPageData} type="characters" />{' '}
            </Pagination>
          </section>
        </>
      )}
      {isError && parsedErrorStatus === 404 && (
        <aside className={css.error}>
          <h3 className={css.errorMessage}>Characters not found</h3>
        </aside>
      )}
      {isError && parsedErrorStatus !== 404 && (
        <aside className={css.error}>
          <h3 className={css.errorMessage}>
            {parsedErrorStatus} {parsedErrorMessage}
          </h3>
        </aside>
      )}
    </article>
  );
}
