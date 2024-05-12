import React, { useEffect, useState } from "react";
import cx from "classnames";
import { IoClose } from "react-icons/io5";
import css from "./list-item-modal.module.scss";
import { SingleCharacter, SingleEpisode } from "../../types/types";
import { useGetOneCharacterQuery } from "../../store/modules/api-slice";
import useClickOutsideClose from "../../hooks/use-click-outside-close";

type ListItemModalProps = {
  data: SingleEpisode;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

type CharactersIds = number[];
type CharactersArray = SingleCharacter[];

export const ListItemModal = ({ data, setIsModalOpen }: ListItemModalProps) => {
  const [charactersIds, setCharactersIds] = useState<CharactersIds | null>([]);
  const [charactersToShow, setCharacterToShow] = useState<CharactersArray>([]);
  const [isAllCharacters, setIsAllCharacters] = useState(false);
  const charactersLinks = data.characters;

  useEffect(() => {
    const extractedCharIds = charactersLinks.map((link) => {
      const lastSlashIndex = link.lastIndexOf("/");
      return Number(link.slice(lastSlashIndex + 1));
    });
    setCharactersIds(extractedCharIds);
  }, [charactersLinks]);

  const { data: charactersData } = useGetOneCharacterQuery(charactersIds);

  const decideCharactersArrayToShow = (
    charachersArray: SingleCharacter[],
    isAllCharacters: boolean
  ) => {
    if (charactersData?.length > 3) {
      isAllCharacters
        ? setCharacterToShow(charachersArray)
        : setCharacterToShow(charachersArray?.slice(0, 3));
    } else {
      setCharacterToShow(charachersArray);
    }
  };

  useEffect(() => {
    decideCharactersArrayToShow(charactersData, isAllCharacters);
  }, [charactersData, isAllCharacters, charactersIds]);

  const ref = useClickOutsideClose(setIsModalOpen);

  return (
    <div className={css.overlay}>
      <style jsx global>{`
        html {
          overflow: hidden;
        }
      `}</style>
      <aside className={css.container} ref={ref}>
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
            {charactersToShow?.length > 0 &&
              charactersToShow.map((element) => (
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
              charactersToShow?.length > 3 && css.displayNone
            )}
          >
            Show all characters
          </button>
        </div>
      </aside>
    </div>
  );
};
