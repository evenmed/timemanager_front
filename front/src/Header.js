import React from "react";
import Router from "next/router";
import NProgress from "nprogress";
import Nav from "./User/Nav";

Router.events.on("routeChangeStart", (url) => NProgress.start());
Router.events.on("routeChangeComplete", () => NProgress.done());
Router.events.on("routeChangeError", () => NProgress.done());

const Header = () => {
  return (
    <div className="row print-hide">
      <div className="col-12">
        <Nav />
      </div>
    </div>
  );
};

export default Header;
