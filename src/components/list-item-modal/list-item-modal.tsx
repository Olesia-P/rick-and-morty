import React, { useState } from "react";
import cx from "classnames";
import { IoClose } from "react-icons/io5";
import css from "./list-item-modal.module.scss";
import { SingleCharacter, SingleEpisode } from "../../types/types";
import { useGetMultipleCharactersQuery } from "../../store/modules/api-slice";

type ListItemModalProps = {
  data: SingleEpisode;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
};
type CharactersArray = SingleCharacter[];

export const ListItemModal = ({ data, setIsModalOpen }: ListItemModalProps) => {
  const [isAllCharacters, setIsAllCharacters] = useState(false);
  const charactersLinks = data.characters;

  const extractedCharIds = charactersLinks.map((link) => {
    const lastSlashIndex = link.lastIndexOf("/");
    return Number(link.slice(lastSlashIndex + 1));
  });
  const { data: charactersData } =
    useGetMultipleCharactersQuery(extractedCharIds);

  const charactersToRender: CharactersArray = isAllCharacters
    ? charactersData
    : charactersData?.slice(0, 3);

  return (
    <>
      <style jsx global>{`
        html {
          overflow: hidden;
        }
      `}</style>
      <div className={css.overlay} onClick={() => setIsModalOpen(false)} />
      <div className={css.container}>
        <aside className={css.modal}>
          <i
            className={css.cross}
            onClick={() => {
              setIsModalOpen(false);
            }}
          >
            <IoClose />
          </i>
          <div className={css.mainInfo}>
            <img
              alt="episode-cover-placeholder"
              src="/episode-cover.png"
              className={css.cover}
            />
            <div className={css.info}>
              <h3 className={css.episodeTitle}>
                {data.id}. {data.name}
              </h3>
              <p className={css.text}>{data.episode}</p>
              <p className={css.text}>Aired: {data.air_date}</p>
            </div>
          </div>

          <div className={css.charactersInfo}>
            <h4 className={css.charactersTitle}>Characters</h4>
            <div className={css.charactersWrap}>
              {charactersToRender?.length > 0 &&
                charactersToRender.map((element) => (
                  <div className={css.characterCard} key={element.id}>
                    <img
                      alt="character-img"
                      className={css.characterImg}
                      src={element.image}
                    />
                    <p className={css.characterName}>{element.name}</p>
                  </div>
                ))}
            </div>

            <button
              onClick={() => setIsAllCharacters(true)}
              className={cx(
                css.charactersButton,
                charactersToRender?.length > 3 && css.displayNone
              )}
            >
              Show all characters
            </button>
          </div>
        </aside>
      </div>
    </>
  );
};
