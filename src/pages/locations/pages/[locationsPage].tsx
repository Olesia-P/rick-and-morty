import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useQuery } from "@apollo/client";
import { LOAD_LOCATIONS } from "../../../graphql/queries";
import { List } from "../../../components/list/list";
import css from "../../../styles/page-styles/locations-page.module.scss";
import { PageTitle } from "../../../components/page-title/page-title";
import { turnPageIntoNumber } from "../../../utils/functions";
import { Pagination } from "../../../components/pagination/pagination";

export default function LocationsPage() {
  const [isPaginationError, setIsPaginationError] = useState(false);
  const router = useRouter();
  const { locationsPage } = router.query;

  const setCurrentPage = (
    page: string | string[] | undefined
  ): number | undefined => {
    if (typeof page !== "undefined") {
      return turnPageIntoNumber(page);
    } else {
      return undefined;
    }
  };

  const currentPage = setCurrentPage(locationsPage);

  const { error, loading, data } = useQuery(LOAD_LOCATIONS, {
    variables: { page: currentPage },
  });

  useEffect(() => {
    if (data?.locations?.info?.pages === null) {
      setIsPaginationError(true);
    }
  }, [data]);

  return (
    <>
      <article className={css.container}>
        <div className={css.title}>
          <PageTitle text="Locations" />
        </div>
        {currentPage && data && !error && !isPaginationError && (
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
    </>
  );
}
