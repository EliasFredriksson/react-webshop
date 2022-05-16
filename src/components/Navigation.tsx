import { useState } from "react";
import { Link } from "react-router-dom";
import "../scss/components/Navigation.scss";

export default function Navigation() {
    const [visible, setVisible] = useState(false);

    function close() {
        setVisible(false);
    }
    function open() {
        setVisible(true);
    }

    function getClassState(): string {
        if (visible) return "open";
        else return "closed";
    }

    return (
        <nav>
            <span className="open-menu-button" onClick={open}>
                ☰
            </span>
            <div className={`menu ${getClassState()}`}>
                <div className="__links">
                    <div className="__buttons">
                        <span>Menu</span>
                        <button onClick={close}>Close</button>
                    </div>

                    <Link to="/" onClick={close}>
                        Home
                    </Link>
                    <Link to="/about" onClick={close}>
                        About
                    </Link>
                </div>
            </div>
        </nav>
    );
}
