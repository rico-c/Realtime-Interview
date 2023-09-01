import React, { FC } from "react";
import Header from '@/components/header/header';
import Homepage from '@/components/homepage/homepage';
import {Footer} from 'components/homepage/footer';
import "./home.scss";

const Home: FC = () => {
  return (
    <div className="home">
      <div className="home-wrapper">
        <Header />
        <Homepage />
      </div>
      <Footer />
    </div>
  )
}

export default Home;