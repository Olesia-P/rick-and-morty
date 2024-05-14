import React, { useState } from "react";
import { IoIosInformationCircleOutline } from "react-icons/io";
import css from "./list-item.module.scss";
import {
  SingleCharacter,
  SingleEpisode,
  SingleLocation,
} from "../../types/types";
import { ListItemModal } from "../list-item-modal/list-item-modal";

type ListItemProps = {
  data?: SingleCharacter | SingleEpisode | SingleLocation;
  type: string;
};

export const ListItem = ({ data, type }: ListItemProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

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

  const renderLocation = (data: SingleLocation) => (
    <>
      <li key={data.id} className={css.container}>
        <img
          src="/location-cover.jpg"
          alt="location-cover-placeholder"
          className={css.cover}
        />
        <div className={css.infoBlock}>
          <h2 className={css.title}>{data.name}</h2>
          <p className={css.text}>{data.type}</p>
          <p className={css.text}>Aired: {data.dimension}</p>
        </div>
      </li>
    </>
  );

  const renderData = () => {
    if (type === "episodes") {
      return renderEpisode(data as SingleEpisode);
    } else if (type === "characters") {
      return renderCharacter(data as SingleCharacter);
    } else if (type === "locations") {
      return renderLocation(data as SingleLocation);
    }

    return null;
  };

  return <>{data && renderData()}</>;
};
