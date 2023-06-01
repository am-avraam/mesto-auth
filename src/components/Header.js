import React from 'react';
import logo from "../images/header/header-logo.svg";

const Header = () => {
    return (
        <header className="header">
            <img src={logo} alt="логотип 'Mesto'" className="header__logo"/>
        </header>
    );
};

export default Header;