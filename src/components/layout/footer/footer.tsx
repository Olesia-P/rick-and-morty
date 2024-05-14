import React from "react";
import { FaGithub } from "react-icons/fa";
import { IoIosMail } from "react-icons/io";
import { BiLogoNetlify } from "react-icons/bi";
import { HiMiniServer } from "react-icons/hi2";
import css from "./footer.module.scss";

export const Footer = () => {
  const linksPersonal = [
    {
      name: "GitHub account",
      link: "https://github.com/Olesia-P",
      icon: <FaGithub />,
    },
    {
      name: "Deployed site",
      link: "https://rick-and-morty-pryhun.netlify.app/episodes/pages/1",
      icon: <BiLogoNetlify />,
    },
    {
      name: "Email: pryhun.o@gmail.com",
      link: "mailto:pryhun.o@gmail.com",
      icon: <IoIosMail />,
    },
    {
      name: "API",
      link: "https://rickandmortyapi.com/documentation/",
      icon: <HiMiniServer />,
    },
  ];

  const technologies = [
    "Next.js",
    "TypeScript",
    "Redux",
    "GraphQL",
    "SCSS",
    "CSS Modules",
    "Classnames (lib)",
  ];
  return (
    <footer className={css.footer}>
      <div className={css.container}>
        <div className={css.personalInfo}>
          <span className={css.name}>Olesia Pryhun</span>
          {linksPersonal.map((element) => (
            <a
              key={element.name}
              href={element.link}
              className={css.personaLink}
            >
              <i className={css.icon}>{element.icon}</i> {element.name}
            </a>
          ))}
        </div>
        <div className={css.techInfo}>
          <span className={css.title}>Technologies used:</span>
          {technologies.map((element) => (
            <span className={css.tech} key={element}>
              {element}
            </span>
          ))}
        </div>
      </div>
    </footer>
  );
};
