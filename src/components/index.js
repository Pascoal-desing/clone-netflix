import React from 'react';
import './Header.css';

const Header = ({black}) =>{
    return(
        <header className={black? 'black' : ''}>
            <div className="header--logo">
                <img src="./netflix.png"/>
            </div>
            <div className="header--user">
                user
            </div>
        </header>
    )
}
export default Header;