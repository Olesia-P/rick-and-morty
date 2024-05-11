import React from "react";
import css from "./list.module.scss";
import { EpisodesData } from "../../types/types";
import { ListItem } from "../list-item/list-item";

type ListProps = {
  data?: EpisodesData;
  type: string;
};

export const List = ({ data, type }: ListProps) => {
  return (
    <div className={css.container}>
      {data?.results?.map((element) => (
        <ListItem key={element.id} data={element} type={type} />
      ))}
    </div>
  );
};
