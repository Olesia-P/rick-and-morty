import React, { useState } from "react";
import css from "./list-item.module.scss";
import { SingleEpisode } from "../../types/types";
import { ListItemModal } from "../list-item-modal/list-item-modal";

type ListItemProps = {
  data: SingleEpisode;
  type: string;
};

type Modal = boolean;

export const ListItem = ({ data, type }: ListItemProps) => {
  const [isModalOpen, setIsModalOpen] = useState<Modal>(false);

  return (
    <div>
      {type === "episodes" && (
        <div key={data.id} onClick={() => setIsModalOpen(true)}>
          {isModalOpen && <ListItemModal data={data} />}{" "}
          <div>
            {data.id} {data.name}
          </div>
          <div>{data.episode}</div>
        </div>
      )}
    </div>
  );
};
