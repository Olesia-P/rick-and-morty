import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useQuery } from "@apollo/client";
import { LOAD_LOCATIONS } from "../../../graphql/queries";
import { List } from "../../../components/list/list";
import css from "../../../styles/page-styles/locations-page.module.scss";
import { PagesNavigationArrows } from "../../../components/pages-navigation-arrows/pages-navigation-arrows";
import { PageTitle } from "../../../components/page-title/page-title";
import { turnPageIntoNumber } from "../../../utils/functions";

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

  // console.log("data", data);

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
        {typeof currentPage !== "undefined" &&
          data &&
          !error &&
          !isPaginationError && (
            <section className={css.list}>
              <div className={css.arrowsWrapper}>
                <PagesNavigationArrows
                  currentPage={currentPage}
                  numberOfPages={data?.locations?.info?.pages}
                  baseUrl="/locations/pages/"
                />
              </div>

              <List data={data?.locations} type="locations" />

              <div className={css.arrowsWrapper}>
                <PagesNavigationArrows
                  currentPage={currentPage}
                  numberOfPages={data?.locations?.info?.pages}
                  baseUrl="/locations/pages/"
                />
              </div>
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
