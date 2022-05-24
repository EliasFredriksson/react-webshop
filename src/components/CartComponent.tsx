import { useContext } from "react";
import "../scss/components/CartComponent.scss";
// ### CONTEXT ###
import { AppContext } from "../App";
import { Link } from "react-router-dom";

export default function CartComponent() {
    const context = useContext(AppContext);

    let html = <></>;
    if (context.cart.length > 0) {
        html = <span>{context.cart.length}</span>;
    }

    return (
        <>
            <Link to="/cart" className="cart">
                <i className="fa-solid fa-basket-shopping">{html}</i>
            </Link>
        </>
    );
}
