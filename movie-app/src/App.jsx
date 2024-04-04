/** @format */
import { useEffect } from "react";
import "./App.scss";
import { DatafromAPi } from "./utils/api";
import { useSelector, useDispatch } from "react-redux";
import { getApiConfig, getGenres } from "./store/slices/HomeSlice";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "swiper/css";
import Header from "./components/Header";
import Home from "./pages/home/Home";
import Footer from "./components/Footer";
import Details from "./pages/details/Details";
import Explore from "./pages/explore/Explore";
import SearchResult from "./pages/searchResult/SearchResult";

function App() {
  const { url } = useSelector((state) => state.home);
  const dispatch = useDispatch();
  useEffect(() => {
    getConfigAPi();
    genresCall();
  }, []);

  const getConfigAPi = () => {
    DatafromAPi("/configuration").then((res) => {
      const url = {
        backdrop: res.images.secure_base_url + "original",
        poster: res.images.secure_base_url + "original",
        profile: res.images.secure_base_url + "original",
      };
      dispatch(getApiConfig(url));
    });
  };

  const genresCall = async () => {
    let promises = [];
    let endpoint = ["tv", "movie"];
    let allgenres = {};

    endpoint.forEach((url) => {
      return promises.push(DatafromAPi(`genre/${url}/list`));
    });

    const data = await Promise.all(promises);
    data.map(({ genres }) => {
      return genres.map((item) => (allgenres[item.id] = item));
    });

    dispatch(getGenres(allgenres));
  };

  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/:mediaType/:id' element={<Details />} />
          <Route path='/explore/:mediaType' element={<Explore />} />
          <Route path='/search/:searchQuery' element={<SearchResult />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
