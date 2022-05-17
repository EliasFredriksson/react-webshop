import { Link } from "react-router-dom";
import "../scss/components/Header.scss";

export default function HeaderComponent() {
    return (
        <header>
            <Link to="/" className="__title">
                Netflix Store
            </Link>
        </header>
    );
}