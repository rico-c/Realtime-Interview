import React, { FC } from "react";
import Header from '@/components/header/header';
import Homepage from '@/components/homepage/homepage';
import "./home.scss";

const Home: FC = () => {
  return (
    <div className="home">
      <div className="home-wrapper">
        <Header />
        <Homepage />
      </div>
    </div>
  )
}

export default Home;