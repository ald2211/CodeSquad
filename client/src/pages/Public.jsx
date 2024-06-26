import React from "react";
import Navbar from "../components/Navbar";
import PublicContentOne from "../components/PublicContentOne";
import PublicContentTwo from "../components/PublicContentTwo";
import PublicContentThree from "../components/PublicContentThree";
import PublicNav from "../components/PublicNav";

const Public = () => {
  return (
    <>
      <PublicNav />
      <PublicContentOne />
      <PublicContentTwo />
      <PublicContentThree />
    </>
  );
};

export default Public;
