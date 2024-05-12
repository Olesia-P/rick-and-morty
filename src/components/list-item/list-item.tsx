import React, { useState } from "react";
import { IoIosInformationCircleOutline } from "react-icons/io";
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
        <li key={data.id} className={css.container}>
          {isModalOpen && (
            <>
              <ListItemModal data={data} setIsModalOpen={setIsModalOpen} />
            </>
          )}
          <img
            src="/episode-cover.png"
            alt="episode-cover-placeholder"
            className={css.cover}
          />
          <div className={css.infoBlock}>
            <h2 className={css.title}>
              {data.id}. {data.name}
            </h2>
            <p className={css.text}>{data.episode}</p>
            <p className={css.text}>Aired: {data.air_date}</p>
          </div>
          <i className={css.infoIcon} onClick={() => setIsModalOpen(true)}>
            <IoIosInformationCircleOutline />
          </i>
        </li>
      )}
    </div>
  );
};
