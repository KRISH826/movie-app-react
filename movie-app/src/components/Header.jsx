/** @format */

import React, { useState, useEffect } from "react";
import { HiOutlineSearch } from "react-icons/hi";
import { SlMenu } from "react-icons/sl";
import { VscChromeClose } from "react-icons/vsc";
import { useNavigate, useLocation } from "react-router-dom";
import Container from "./Container";
import logo from "../assets/images/movix-logo.svg";

const Header = () => {
  const [show, setShow] = useState("top");
  const [lastScrollY, setLastScrollY] = useState(0);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [query, setQuery] = useState("");
  const [showSearch, setShowSearch] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  const headerScroll = () => {
    if (window.scrollY > 200) {
      if (window.scrollY > lastScrollY && !mobileMenu) {
        setShow("hide");
      } else {
        setShow("show");
      }
      setLastScrollY(window.scrollY);
    } else {
      setShow("top");
    }
    setLastScrollY(window.scrollY);
  };

  useEffect(() => {
    window.addEventListener("scroll", headerScroll);

    return () => {
      window.removeEventListener("scroll", headerScroll);
    };
  }, [lastScrollY]);

  const navigateHandler = (type) => {
    if (type === "movie") {
      navigate("/explore/movie");
    } else {
      navigate("/explore/tv");
    }
    setMobileMenu(false);
  };

  const searchQueryHandler = (event) => {
    if (event.key === "Enter" && query.length > 0) {
      navigate(`/search/${query}`);
    }
    setTimeout(() => {
      setShowSearch(false);
    }, 4000);
  };

  const openSearch = () => {
    setShowSearch(true);
    setMobileMenu(false);
  };

  const mobileMenuHandler = () => {
    setMobileMenu(true);
  };

  return (
    <header
      className={`header ${mobileMenu ? "mobileView" : "desktopView"} ${show}`}>
      <Container>
        <div className='header_content'>
          <div className='logo'>
            <img src={logo} alt='logo' onClick={() => navigate("/")} />
          </div>
          <ul className='menuItems'>
            <li className='menuItem' onClick={() => navigateHandler("movie")}>
              Movies
            </li>
            <li className='menuItem' onClick={() => navigateHandler("tv")}>
              TV Shows
            </li>
            <li className='menuItem'>
              <HiOutlineSearch onClick={openSearch} />
            </li>
          </ul>
          <div className='mobileMenuItems'>
            <HiOutlineSearch onClick={openSearch} />
            {mobileMenu ? (
              <VscChromeClose onClick={() => setMobileMenu(false)} />
            ) : (
              <SlMenu onClick={mobileMenuHandler} />
            )}
          </div>
        </div>
      </Container>
      {showSearch && (
        <div className='searchBar'>
          <Container>
            <div className='searchInput'>
              <input
                type='text'
                placeholder='Search for a movie or tv show....'
                onChange={(e) => setQuery(e.target.value)}
                onKeyUp={searchQueryHandler}
              />
              <VscChromeClose onClick={() => setShowSearch(false)} />
            </div>
          </Container>
        </div>
      )}
    </header>
  );
};

export default Header;
