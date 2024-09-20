'use client';

import React, { useEffect, useState } from 'react';
import { useQuery } from '@apollo/client';
import { LOAD_LOCATIONS } from '../../../../graphql/queries';
import css from '../../../../styles/page-styles/locations-page.module.scss';
import { PageTitle } from '@/components/page-ui-related/page-title/page-title';
import { Pagination } from '@/components/pagination/pagination';
import { List } from '@/components/list/list';

export default function LocationsPage({
  params,
}: {
  params: { locationsPageId: string };
}) {
  const [isPaginationError, setIsPaginationError] = useState(false);

  const { locationsPageId } = params;
  const currentPage = +locationsPageId;

  const { error, loading, data } = useQuery(LOAD_LOCATIONS, {
    variables: { page: currentPage },
  });

  useEffect(() => {
    if (data?.locations?.info?.pages === null) {
      setIsPaginationError(true);
    }
  }, [data]);

  return (
    <article className={css.container}>
      <div className={css.title}>
        <PageTitle text="Locations" />
      </div>
      {data && !error && !isPaginationError && (
        <section className={css.list}>
          <Pagination
            currentPage={currentPage}
            numberOfPages={data?.locations?.info?.pages}
            baseUrl="/locations/pages/"
          >
            <List data={data?.locations} type="locations" />
          </Pagination>
        </section>
      )}

      {error && (
        <aside className={css.error}>
          <h2 className={css.errorMessage}>{error.message}</h2>
        </aside>
      )}
      {isPaginationError && (
        <aside className={css.error}>
          <h2 className={css.errorMessage}>No locations found</h2>
        </aside>
      )}
    </article>
  );
}
