import React, { useState } from "react";
import { BiMoviePlay } from "react-icons/bi";
import { BsPeopleFill } from "react-icons/bs";
import { GiHamburgerMenu } from "react-icons/gi";
import { MdLocationCity } from "react-icons/md";
import css from "./navbar.module.scss";
import { MobileMenu } from "../navbar/mobile-menu/mobile-menu";
import useMediaQuery from "../../../hooks/use-media-query";

export const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const isLowTablet = useMediaQuery(768);
  const links = [
    { name: "Episodes", link: "/episodes/pages/1", icon: <BiMoviePlay /> },
    { name: "Characters", link: "/characters/pages/1", icon: <BsPeopleFill /> },
    { name: "Locations", link: "/locations/pages/1", icon: <MdLocationCity /> },
  ];

  return (
    <div className={css.container}>
      <nav className={css.navbar}>
        {isLowTablet && (
          <i
            className={css.hamburger}
            onClick={() => setIsMobileMenuOpen(true)}
          >
            <GiHamburgerMenu />
          </i>
        )}
        <div className={css.logo}> RICK AND MORTY</div>
        {!isLowTablet && (
          <>
            {links.map((element) => (
              <a key={element.name} href={element.link} className={css.navLink}>
                <i className={css.icon}>{element.icon}</i> {element.name}
              </a>
            ))}
          </>
        )}
      </nav>
      <MobileMenu
        links={links}
        isMobileMenuOpen={isMobileMenuOpen}
        setIsMobileMenuOpen={setIsMobileMenuOpen}
      />
    </div>
  );
};
