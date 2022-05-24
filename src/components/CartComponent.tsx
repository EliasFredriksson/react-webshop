import { useContext } from "react";
import "../scss/components/CartComponent.scss";
import { Link } from "react-router-dom";
import { AppContext } from "../contexts/AppContext";
// ### CONTEXT ###

interface ICartComponentProps {
    extraClass: string;
}

export default function CartComponent(props: ICartComponentProps) {
    const context = useContext(AppContext);

    let html = <></>;
    if (context.cart.length > 0) {
        html = <span>{context.cart.length}</span>;
    }

    return (
        <Link to="/cart" className="cart">
            <i className={`fa-solid fa-basket-shopping ${props.extraClass}`}>
                {html}
            </i>
        </Link>
    );
}
