import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import "../scss/components/NavigationDesktop.scss";

export default function NavigationDesktop() {
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
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

    return (
        <div className="desktop-nav" ref={ref}>
            <Link to="/" data-path="/">
                Home
            </Link>
            <Link to="/about" data-path="/about">
                About
            </Link>
            <Link to="/cart" data-path="/cart">
                Cart
            </Link>
        </div>
    );
}
