import React from "react";
import { Route, Routes, useLocation } from "react-router-dom";

import HeaderContainer from "../containers/header/header.container";

import About from "../pages/about";
import Home from "../pages/home";
import Login from "../pages/login";
import Job from "./../pages/job/index";
import Vacancy from "../pages/vacancy";

import { useAppDispatch } from "../redux/hooks";
import { fetchItsMe } from "./../redux/slices/account/slice";
import { setActiveScreen } from "../redux/slices/screen/slice";
import { getRouteByValue } from "./getRoute";
import FooterContainer from "../containers/footer/footer.container";
import Wrapper from "../components/wrapper";
import Main from "../components/main";

function App() {
  const refFalg = React.useRef<boolean>(true);
  const dispatch = useAppDispatch();
  const location = useLocation();

  React.useEffect(() => {
    if (refFalg.current) {
      dispatch(fetchItsMe());
      dispatch(setActiveScreen(getRouteByValue(location.pathname)));
    }
    refFalg.current = false;
  }, []);

  return (
    <>
      <Wrapper>
        <HeaderContainer />
        <Main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/login" element={<Login />} />
            <Route path="/vacancy" element={<Job />} />
            <Route path="/vacancy/:id" element={<Vacancy />} />
          </Routes>
        </Main>
        <FooterContainer />
      </Wrapper>
    </>
  );
}

export default App;
