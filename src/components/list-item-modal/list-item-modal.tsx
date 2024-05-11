import React, { useEffect, useState } from "react";
import cx from "classnames";
import css from "./list-item-modal.module.scss";
import { SingleCharacter, SingleEpisode } from "../../types/types";
import { useGetOneCharacterQuery } from "../../store/modules/api-slice";

type ListItemModalProps = {
  data: SingleEpisode;
};

type CharactersIds = number[];
type CharactersArray = SingleCharacter[];

export const ListItemModal = ({ data }: ListItemModalProps) => {
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

  return (
    <div>
      Characters:
      {charactersToShow?.length > 0 &&
        charactersToShow.map((element) => (
          <div key={element.id}>{element.name}</div>
        ))}
      <button
        onClick={() => setIsAllCharacters(true)}
        className={cx(charactersToShow?.length < 3 && css.displayNone)}
      >
        Show all characters
      </button>
    </div>
  );
};
