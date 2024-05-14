import React from "react";
import css from "./list.module.scss";
import { EpisodesData, CharactersData, LocationsData } from "../../types/types";
import { ListItem } from "../list-item/list-item";

type ListProps = {
  data?: EpisodesData | CharactersData | LocationsData;
  type: string;
};

export const List = ({ data, type }: ListProps) => {
  return (
    <ul className={css.container}>
      {data?.results?.map((element) => (
        <div key={element.id} className={css.listItemWrapper}>
          {" "}
          <ListItem data={element} type={type} />
        </div>
      ))}
    </ul>
  );
};
