import React from "react";
import ResponsiveAppBar from "../components/ResponsiveAppBar";
import { Outlet, useLocation } from "react-router-dom";
import Fund from "./Fund";

const Root = () => {
  const location = useLocation();
  console.log(location);
  return (
    <div>
      <ResponsiveAppBar />
      {location.pathname === "/" ? <Fund /> : <Outlet />}
    </div>
  );
};

export default Root;
