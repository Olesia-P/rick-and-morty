import React from "react";
import { IoClose } from "react-icons/io5";
import cx from "classnames";
import css from "./mobile-menu.module.scss";

type MobileMenuProps = {
  links: {
    name: string;
    link: string;
    icon: React.JSX.Element;
  }[];
  isMobileMenuOpen: boolean;
  setIsMobileMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export const MobileMenu = ({
  links,
  setIsMobileMenuOpen,
  isMobileMenuOpen,
}: MobileMenuProps) => {
  return (
    <>
      <div
        className={cx(css.overlay, !isMobileMenuOpen && css.none)}
        onClick={() => setIsMobileMenuOpen(false)}
      />

      {isMobileMenuOpen && (
        <style jsx global>{`
          html {
            overflow: hidden;
          }
        `}</style>
      )}

      <nav className={cx(css.container, isMobileMenuOpen && css.opened)}>
        <div className={css.panel}>
          <i className={css.cross} onClick={() => setIsMobileMenuOpen(false)}>
            <IoClose />
          </i>
        </div>
        <div className={css.linksWrap}>
          {links.map((element) => (
            <a key={element.name} href={element.link} className={css.navLink}>
              <i className={css.icon}>{element.icon}</i> {element.name}
            </a>
          ))}
        </div>
      </nav>
    </>
  );
};
