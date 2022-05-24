import { ChangeEvent, useEffect, useRef } from "react";
import "../scss/components/SearchBar.scss";

interface ISearchBarProps {
    searchText: string;
    setText(text: string): void;
    triggerFetch(): void;
}

export default function SearchBar(props: ISearchBarProps) {
    const ref = useRef<HTMLFormElement>(null);

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
            { threshold: 1, rootMargin: "-50px 0px 0px 0px" }
        );
        const { current } = ref;
        if (!current) return;
        observer.observe(current);
    }, []);

    function handleSubmit(e: ChangeEvent<HTMLFormElement>) {
        e.preventDefault();
        props.triggerFetch();
    }

    return (
        <form onSubmit={handleSubmit} className="search-bar" ref={ref}>
            <input
                type="text"
                onChange={(event) => {
                    props.setText(event.target.value);
                }}
                value={props.searchText}
                placeholder="Search for any media!"
            />

            <button type="submit">
                <i className="fa-solid fa-magnifying-glass"></i>
            </button>
        </form>
    );
}
