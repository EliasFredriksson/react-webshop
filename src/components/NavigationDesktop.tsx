import { Link } from "react-router-dom";
import "../scss/components/NavigationDesktop.scss";

export default function NavigationDesktop() {
    return (
        <nav className="desktop-nav">
            <Link to="/">Home</Link>
            <Link to="/about">About</Link>
        </nav>
    );
}
