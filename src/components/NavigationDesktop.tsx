import { useLayoutEffect, useRef } from "react";
import "../scss/components/NavigationDesktop.scss";
// ### ROUTER ###
import { Link } from "react-router-dom";
// ### COMPONENT
import CartIcon from "./CartIcon";

export default function NavigationDesktop() {
    const ref = useRef<HTMLDivElement>(null);

    useLayoutEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    entry.target.classList.toggle(
                        "is-pinned",
                        entry.intersectionRatio < 1
                    );
                });
            },
            { threshold: 1 }
        );
        const { current } = ref;
        if (!current) return;
        observer.observe(current);
    }, []);

    function handleClick() {
        window.scrollTo(0, 0);
    }

    return (
        <div className="desktop-nav" ref={ref}>
            <Link to="/" onClick={handleClick}>
                Home
            </Link>
            <Link to="/about" onClick={handleClick}>
                About
            </Link>
            <CartIcon extraClass="__desktop"></CartIcon>
        </div>
    );
}
