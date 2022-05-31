import { useContext, useLayoutEffect, useRef } from "react";
import "../scss/components/CartIcon.scss";
import { Link } from "react-router-dom";
import { AppContext } from "../contexts/AppContext";
// ### CONTEXT ###

interface ICartComponentProps {
    extraClass: string;
}

export default function CartIcon(props: ICartComponentProps) {
    const context = useContext(AppContext);

    const spanRef = useRef<HTMLSpanElement>(null);

    let html = <></>;
    if (context.cart.length > 0) {
        html = <>{context.cart.length}</>;
    }

    const { current } = spanRef;
    useLayoutEffect(() => {
        if (current) {
            current.classList.add("pulse");
            setTimeout(() => {
                current.classList.remove("pulse");
            }, 1000);
        }
    }, [context.cart]);

    function handleClick() {
        window.scrollTo(0, 0);
    }

    return (
        <Link to="/cart" className="cart" onClick={handleClick}>
            <i className={`fa-solid fa-basket-shopping ${props.extraClass}`}>
                <span ref={spanRef} className="">
                    {html}
                </span>
            </i>
        </Link>
    );
}
