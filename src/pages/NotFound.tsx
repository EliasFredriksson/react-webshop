// ### ROUTER ###
import { Link } from "react-router-dom";
// ### COMPONENTS ###
import HeaderComponent from "../components/HeaderComponent";
import FooterComponent from "../components/FooterComponent";
import NavigationDesktop from "../components/NavigationDesktop";
// ### SCSS ###
import "../scss/components/NotFound.scss";

export default function NotFound() {
    return (
        <>
            <HeaderComponent></HeaderComponent>
            <NavigationDesktop></NavigationDesktop>
            <main>
                <div className="not-found">
                    <h1>Woops! 404</h1>
                    <Link to="/" className="__go-back">
                        ↻
                    </Link>
                </div>
            </main>
            <FooterComponent></FooterComponent>
        </>
    );
}
