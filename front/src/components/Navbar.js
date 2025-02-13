import React, { useState } from "react";
import "./Navbar.css";
import { useNavigate } from "react-router-dom";

const Navbar = ({ menu1, menu2, link1, link2 }) => {
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();
    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };
    const forlink = (link) => {
        navigate(link)
    }
    return (
        <div className="bunner">
            <div className="horizontal-line">
                <div className="tagName">
                    SkyGallery
                </div>
                <div className="nav-links">
                    <button onClick={() => forlink(link1)}>{menu1}</button>
                    <button onClick={() => forlink(link2)}>{menu2}</button>
                </div>
            </div>
            <div className="hamburger-menu">
                <button className="menu-button" onClick={toggleMenu}>
                    ☰
                </button>
                {isOpen && (
                    <div className="menu">
                        <button className="menu1" onClick={() => { forlink(link1) }}>{menu1}</button>
                        <button className="menu1" onClick={() => { forlink(link2) }}>{menu2}</button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Navbar;
