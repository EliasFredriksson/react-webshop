import { useState } from "react";
import "../scss/components/Navigation.scss";
// ### ROUTER ###
import { Link } from "react-router-dom";

export default function Navigation() {
    const [visible, setVisible] = useState(false);
    const [faded, setFaded] = useState(true);
    const animationDelay = 250;

    function close() {
        setFaded(true);
        setTimeout(() => {
            setVisible(false);
            window.scrollTo(0, 0);
        }, animationDelay);
    }
    function open() {
        setVisible(true);
        setTimeout(() => {
            setFaded(false);
        }, animationDelay);
    }

    return (
        <nav className="mobile-nav">
            <span className="menu-btn" onClick={open}>
                <i className="fa-solid fa-bars"></i>
            </span>
            <div className={visible ? "menu open" : "menu closed"}>
                <div className={`__links ${faded ? "fade-out" : "fade-in"}`}>
                    <div className="__top">
                        <span className="menu-title">Menu</span>
                        <span className="menu-btn close" onClick={close}>
                            <i className="fa-solid fa-xmark"></i>
                        </span>
                    </div>

                    <Link to="/" onClick={close} className="menu-link">
                        Home
                    </Link>
                    <Link to="/about" onClick={close} className="menu-link">
                        About
                    </Link>
                    <Link to="/cart" onClick={close} className="menu-link">
                        Cart
                    </Link>
                </div>
            </div>
        </nav>
    );
}
