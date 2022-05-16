import { Link } from "react-router-dom";
// ### SCSS ###
import "../scss/components/NotFound.scss";

export default function NotFound() {
    return (
        <>
            <main>
                <div className="not-found">
                    <h1>Woops! Nothing here.</h1>
                    <Link to="/" className="__go-back">
                        ↻
                    </Link>
                </div>
            </main>
        </>
    );
}
