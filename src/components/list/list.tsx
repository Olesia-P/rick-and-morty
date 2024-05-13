import React from "react";
import css from "./list.module.scss";
import { EpisodesData, CharactersData, LocationsData } from "../../types/types";
import { ListItem } from "../list-item/list-item";

type ListProps<T> = {
  data?: T[];
};

const isEpisodesData = (data: any): data is EpisodesData => {
  return data.results.length > 0 && "air_date" in data.results[0];
};

const isCharactersData = (data: any): data is CharactersData => {
  return data.results.length > 0 && "gender" in data.results[0];
};

const isLocationsData = (data: any): data is LocationsData => {
  return data.results.length > 0 && "dimension" in data.results[0];
};

export const List = <T extends EpisodesData | CharactersData | LocationsData>({
  data,
}: ListProps<T>) => {
  const renderContent = (
    data: EpisodesData | CharactersData | LocationsData
  ) => {
    return (
      <ul className={css.container}>
        {data?.results?.map((element) => (
          <div key={element.id} className={css.listItemWrapper}>
            {" "}
            <ListItem data={element} />
          </div>
        ))}
      </ul>
    );
  };
  const renderEpisodes = (data: EpisodesData) => renderContent(data);

  const renderCharacters = (data: CharactersData) => renderContent(data);

  const renderLocations = (data: LocationsData) => renderContent(data);

  const renderData = () => {
    if (isEpisodesData(data)) {
      return renderEpisodes(data);
    } else if (isCharactersData(data)) {
      return renderCharacters(data);
    } else if (isLocationsData(data)) {
      return renderLocations(data);
    }

    return null;
  };

  return <>{data && renderData()}</>;
};
