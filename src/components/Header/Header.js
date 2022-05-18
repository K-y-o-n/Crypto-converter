import React from 'react';
import BlockchainImg from "../../Images/blockchain_logo.svg"
import { Link } from "react-router-dom";
import "./Header.css"

const Header = () => {

  return (
    <div className='header'>
      <div className="header__logo">
        <img src={BlockchainImg} alt="BlockchainImg" width="60px" height="60px"></img>
        <h1>Конвертер криптовалют</h1>
      </div>

      <nav className="header__nav">
        <Link to="/">Конвертер</Link>
        <Link to="wallet">В кошелек</Link>
      </nav>
    </div>
  );
};

export default Header;