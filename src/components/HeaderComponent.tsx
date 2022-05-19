import { Link } from "react-router-dom";
import "../scss/components/Header.scss";

export default function HeaderComponent() {
    return (
        <header id="scroll-to-top">
            <Link to="/" className="__title">
                Omdb
            </Link>
        </header>
    );
}
