import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { gql, GraphQLClient } from "graphql-request";
import { List } from "../../../components/list/list";
import css from "../../../styles/page-styles/locations-page.module.scss";
import { PagesNavigationArrows } from "../../../components/pages-navigation-arrows/pages-navigation-arrows";
import { PageTitle } from "../../../components/page-title/page-title";
import { turnPageIntoNumber } from "../../../utils/functions";

export default function LocationsPage() {
  const [locationsData, setLocationsData] = useState<null | any>(null);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("L");
  const router = useRouter();
  const { locationsPage } = router.query;

  const endpoint = "https://rickandmortyapi.com/graphql";
  const client = new GraphQLClient(endpoint);

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
  const query = gql`
    query LocationsQuery {
      locations(page: ${currentPage}) {
        info {
          count
          pages
        }
        results {
          id
          name
          type
          dimension
        }
      }
    }
  `;

  const fetchData = async () => {
    try {
      const data = await client.request(query);
      setLocationsData(data);
    } catch (error) {
      if (error) {
        setIsError(true);
      }
    }
  };

  useEffect(() => {
    if (currentPage) {
      fetchData();
    }
  }, [currentPage]);

  useEffect(() => {
    if (locationsData?.locations?.info?.pages === null) {
      setIsError(true);
      setErrorMessage("No locations found");
    }
  }, [locationsData]);

  return (
    <>
      <article className={css.container}>
        <div className={css.title}>
          <PageTitle text="Locations" />
        </div>

        <section className={css.list}>
          {typeof currentPage !== "undefined" &&
            typeof locationsData !== null &&
            !isError && (
              <div className={css.arrowsWrapper}>
                <PagesNavigationArrows
                  currentPage={currentPage}
                  numberOfPages={locationsData?.locations?.info?.pages}
                  baseUrl="/locations/pages/"
                />
              </div>
            )}

          {!isError && locationsData !== null && (
            <List data={locationsData?.locations} type="locations" />
          )}

          {typeof currentPage !== "undefined" &&
            typeof locationsData !== null &&
            !isError && (
              <div className={css.arrowsWrapper}>
                <PagesNavigationArrows
                  currentPage={currentPage}
                  numberOfPages={locationsData?.locations?.info?.pages}
                  baseUrl="/locations/pages/"
                />
              </div>
            )}
        </section>

        {isError && (
          <aside className={css.error}>
            <h2 className={css.errorMessage}>{errorMessage}</h2>
          </aside>
        )}
      </article>
    </>
  );
}
