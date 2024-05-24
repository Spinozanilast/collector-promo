"use client";

import { useHoverImageEffect } from "@/components/hooks/useHoverImageEffects";
import Link from "next/link";
import Image from "next/image";
import "@styles/NavMenuUp.css";
import { navItems } from "../data/navigationItems";

const NavMenuUp = () => {
  const hoverUri = "/logo/firing-revolver.gif";
  const logoStaticUri = "/logo/revolver-static.png";
  const logoImageElementId = "nav__logo";

  useHoverImageEffect(logoStaticUri, hoverUri, logoImageElementId);

  return (
    <nav id="nav">
      <Image
        id={logoImageElementId}
        src={logoStaticUri}
        alt="logo"
        width={250}
        height={120}
      />
      <div className="nav__menu-center">
        <p className="nav__text-name">
          Collector <span id="nav__game-word">game</span>
        </p>
      </div>
      <div className="nav__menu">
        <ul>
          {navItems.map(
            (navItem: { name: string; link: string }, idx: number) => (
              <li key={`el-${idx}`}>
                <Link
                  key={`link=${idx}`}
                  href={navItem.link}
                  className="nav__link"
                >
                  {navItem.name}
                </Link>
              </li>
            )
          )}
        </ul>
      </div>
    </nav>
  );
};

export default NavMenuUp;
