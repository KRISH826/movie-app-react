/** @format */
import { useEffect } from "react";
import "./App.scss";
import { DatafromAPi } from "./utils/api";
import { useSelector, useDispatch } from "react-redux";
import { getApiConfig } from "./store/slices/HomeSlice";
import { BrowserRouter, Routes, Route } from "react-router-dom";
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
  }, []);

  const getConfigAPi = () => {
    DatafromAPi("/configuration").then((res) => {
      const url = {
        backdrop: res.images.secure_base_url + "original",
        poster: res.images.secure_base_url + "original",
        profile: res.images.secure_base_url + "original",
      };
      dispatch(getApiConfig(url));
      console.log(res);
    });
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
