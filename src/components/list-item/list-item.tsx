import React, { useState } from "react";
import { IoIosInformationCircleOutline } from "react-icons/io";
import css from "./list-item.module.scss";
import {
  SingleCharacter,
  SingleEpisode,
  SingleLocation,
} from "../../types/types";
import { ListItemModal } from "../list-item-modal/list-item-modal";

type ListItemProps<T> = {
  data?: T;
};
type Modal = boolean;

const isEpisodeData = (data: any): data is SingleEpisode => {
  return data.hasOwnProperty("air_date");
};

const isCharacterData = (data: any): data is SingleCharacter => {
  return data.hasOwnProperty("gender");
};

const isLocationData = (data: any): data is SingleLocation => {
  return data.hasOwnProperty("residents");
};

export const ListItem = <
  T extends SingleEpisode | SingleCharacter | SingleLocation
>({
  data,
}: ListItemProps<T>) => {
  const [isModalOpen, setIsModalOpen] = useState<Modal>(false);

  const renderEpisode = (data: SingleEpisode) => (
    <>
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
    </>
  );

  const renderCharacter = (data: SingleCharacter) => (
    <>
      <li key={data.id} className={css.container}>
        <img src={data.image} alt="character-image" className={css.cover} />
        <div className={css.infoBlock}>
          <h2 className={css.title}>{data.name}</h2>
          <p className={css.text}>Status: {data.status}</p>
          <p className={css.text}>Gender: {data.gender}</p>
          <p className={css.text}>Species: {data.species}</p>
        </div>
      </li>
    </>
  );

  const renderLocation = (data: SingleLocation) => <></>;

  const renderData = () => {
    if (isEpisodeData(data)) {
      return renderEpisode(data);
    } else if (isCharacterData(data)) {
      return renderCharacter(data);
    } else if (isLocationData(data)) {
      return renderLocation(data);
    }

    return null;
  };

  return <>{data && renderData()}</>;
};
