import { useState, useEffect } from "react";
import "./App.css";
import SwiperView from "./SwiperView";
import Popover from "./Popover";
import clsx from "clsx";
import useBreakpoint from "./useBreakpoint";

function App() {
  const navItems = [
    "Home",
    "About Us",
    "Services",
    "Portfolio",
    "Blog",
    "Contact",
    "Products",
    "Pricing",
    "FAQ",
    "Testimonials",
    "Team",
    "Careers",
    "Events",
    "News",
    "Gallery",
    "Support",
    "Downloads",
    "Our Story",
    "Shop",
    "Partners",
  ];

  const [visibleItems, setVisibleItems] = useState<string[]>([]);
  const [hiddenItems, setHiddenItems] = useState<string[]>([]);
  const [activeNav, setActiveNav] = useState<string>();
  const [anchorEl, setAnchorEl] = useState<Element | null>(null);
  const [activeMobileNav, setActiveMobileNav] = useState<boolean>(false);
  const anchorId = anchorEl ? "sort-by-popover" : undefined;

  const isMobile = useBreakpoint({ max: "sm" });

  useEffect(() => {
    const calculateVisibleItems = () => {
      const navList = document.querySelector<HTMLElement>(".topnav");

      if (!navList) return;

      const availableWidth =
        Math.floor(navList.clientWidth) - getTextWidth("More &#9660;"); // Use clientWidth instead of offsetWidth

      let totalWidth = 0;
      const newVisibleItems: string[] = [];
      const navItemsCopy = [...navItems];
      let nextItem;

      while (navItemsCopy.length > 0) {
        nextItem = navItemsCopy.shift();
        if (!nextItem) break;
        const itemWidth = getTextWidth(nextItem);

        if (totalWidth + itemWidth <= availableWidth) {
          newVisibleItems.push(nextItem);
          totalWidth += itemWidth;
        } else {
          break;
        }
      }

      setVisibleItems(newVisibleItems);
      setHiddenItems(nextItem ? [nextItem, ...navItemsCopy] : navItemsCopy);
    };

    const getTextWidth = (text?: string) => {
      if (!text) return 0;

      const hiddenElement = document.createElement("div");
      hiddenElement.style.cssText = `
        font: 16px Inter; /* Change the font and size to match your styling */
        display: inline; /* Ensure it's an inline element for accurate width calculation */
        position: absolute; /* Remove from the layout flow */
        visibility: hidden; /* Hide it from view */
      `;
      hiddenElement.textContent = text;
      document.body.appendChild(hiddenElement);

      const width = hiddenElement.offsetWidth;

      document.body.removeChild(hiddenElement);

      return width + 2 * 16;
    };

    window.addEventListener("load", calculateVisibleItems);
    window.addEventListener("resize", calculateVisibleItems);

    return () => {
      window.removeEventListener("load", calculateVisibleItems);
      window.removeEventListener("resize", calculateVisibleItems);
    };
  }, []);

  useEffect(() => {
    if (isMobile) {
      setAnchorEl(null);
    }
  }, [isMobile]);

  const renderNavItems = (items: string[]) => {
    return items.map((item, index) => (
      <li
        key={index}
        className={item === activeNav ? "active" : ""}
        onClick={() => setActiveNav(item)}
      >
        <a className="navText">{item}</a>
      </li>
    ));
  };

  const renderMoreDropdownItems = (items: string[]) => {
    return (
      <div className="dropdown">
        {items.map((item, index) => (
          <li
            key={index}
            className={item === activeNav ? "activeItem" : ""}
            onClick={() => setActiveNav(item)}
          >
            <a className="navText">{item}</a>
          </li>
        ))}
      </div>
    );
  };

  const renderPopover = () => {
    return (
      <Popover
        anchorEl={anchorEl}
        setAnchorEl={setAnchorEl}
        anchorId={anchorId}
      >
        {renderMoreDropdownItems(hiddenItems)}
      </Popover>
    );
  };

  return (
    <div className="App">
      <div className="topnavContainer">
        <img src="/yt-white.png" alt="Youtube Logo" className="navLogo" />
        <div className="flex1 desktop">
          <div className="topnav">
            <ul className="navbar">
              {renderNavItems(visibleItems)}
              {!!hiddenItems.length && (
                <li className="more">
                  <a
                    onClick={(e) => setAnchorEl(e.currentTarget)}
                    className="moreText"
                  >
                    More &#9660;
                  </a>
                </li>
              )}
            </ul>
          </div>
          <input
            type="text"
            className="textInput"
            placeholder="Search here..."
          />
        </div>
        <button className="menuBtn" onClick={() => setActiveMobileNav(true)}>
          Menu
        </button>
      </div>
      <div className={clsx("mobileNav", activeMobileNav && "activeMobileNav")}>
        <div className="closeContainer">
          <button
            className="closeActionBtn"
            onClick={() => setActiveMobileNav(false)}
          >
            Close
          </button>
        </div>
        <input type="text" className="textInput" placeholder="Search here..." />
        {renderMoreDropdownItems(navItems)}
      </div>
      {renderPopover()}
      <SwiperView />
    </div>
  );
}

export default App;
