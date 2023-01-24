import React from "react";
import ResponsiveAppBar from "../components/ResponsiveAppBar";
import { Outlet } from "react-router-dom";

const Root = () => {
  return (
    <div>
      <ResponsiveAppBar />
      <Outlet />
    </div>
  );
};

export default Root;
