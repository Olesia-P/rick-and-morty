import React from "react";
import Link from "next/link";
import { BiMoviePlay } from "react-icons/bi";
import { BsPeopleFill } from "react-icons/bs";
import { MdLocationCity } from "react-icons/md";
import css from "./navbar.module.scss";

export const Navbar = () => {
  const links = [
    { name: "Episodes", link: "/", icon: <BiMoviePlay /> },
    { name: "Characters", link: "/characters", icon: <BsPeopleFill /> },
    { name: "Locations", link: "/locations", icon: <MdLocationCity /> },
  ];

  return (
    <div className={css.container}>
      <nav className={css.navbar}>
        <div className={css.logo}> RICK AND MORTY</div>

        {links.map((element) => (
          <a key={element.name} href={element.link} className={css.navLink}>
            <i className={css.icon}>{element.icon}</i> {element.name}
          </a>
        ))}
      </nav>
    </div>
  );
};
