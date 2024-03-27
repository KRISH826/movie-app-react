/** @format */
import { useEffect } from "react";
import "./App.scss";
import { DatafromAPi } from "./utils/api";
import { useSelector, useDispatch } from "react-redux";
import { getApiConfig } from "./store/slices/HomeSlice";

function App() {
  const { url } = useSelector((state) => state.home);
  const dispatch = useDispatch();
  useEffect(() => {
    const apiTesting = () => {
      DatafromAPi("movie/popular").then((res) => {
        dispatch(getApiConfig(res));
      });
    };

    apiTesting();
  }, []);

  return (
    <>
      <h1>HELLO WORLD {url.total_pages}</h1>
    </>
  );
}

export default App;
