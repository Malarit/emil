import React from "react";
import { Route, Routes } from "react-router-dom";
import HeaderContainer from "../containers/header/header.container";
import About from "../pages/about";
import Home from "../pages/home";
import Login from "../pages/login";
import { useAppDispatch } from "../redux/hooks";
import { fetchItsMe } from "./../redux/slices/account/slice";
import Job from "./../pages/job/index";

function App() {
  const refFalg = React.useRef<boolean>(true);
  const dispatch = useAppDispatch();

  React.useEffect(() => {
    if (refFalg.current) dispatch(fetchItsMe());
    refFalg.current = false;
  }, []);

  return (
    <>
      <HeaderContainer />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />
        <Route path="/vacancy" element={<Job />} />
      </Routes>
    </>
  );
}

export default App;
