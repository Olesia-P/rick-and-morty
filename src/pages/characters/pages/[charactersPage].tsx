import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { useGetCharactersOnePageQuery } from "../../../store/modules/api-slice";
import { List } from "../../../components/list/list";
import css from "../../../styles/page-styles/characters-page.module.scss";
import { PageTitle } from "../../../components/page-title/page-title";
import {
  parseErrorMessage,
  parseErrorStatus,
  turnPageIntoNumber,
} from "../../../utils/functions";
import { CharactersInputs } from "../../../components/characters-inputs/characters-inputs";
import { CharactersState } from "../../../types/types";
import { changePage } from "../../../store/modules/characters-slice";
import { Pagination } from "../../../components/pagination/pagination";

export default function CharactersPage() {
  const router = useRouter();
  const { charactersPage } = router.query;
  const charactersParams = useSelector(
    (state: { characters: CharactersState }) =>
      state.characters.charactersParams
  );
  const {
    data: charactersPageData,
    error,
    isError,
  } = useGetCharactersOnePageQuery(charactersParams);

  const dispatch = useDispatch();
  const currentPage = turnPageIntoNumber(charactersPage);
  const parsedErrorStatus = parseErrorStatus(error);
  const parsedErrorMessage = parseErrorMessage(error);

  useEffect(() => {
    if (typeof charactersPage === "string") {
      dispatch(changePage(charactersPage));
    }
  }, [charactersPage]);

  return (
    <>
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
                <List data={charactersPageData} type="characters" />{" "}
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
    </>
  );
}
