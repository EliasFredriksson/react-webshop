import { ChangeEvent, useEffect, useRef } from "react";
import "../scss/components/SearchBarComponent.scss";

interface ISearchBarProps {
    searchText: string;
    setText: Function;
    triggerFetch: Function;
}

export default function SearchBarComponent(props: ISearchBarProps) {
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
            { threshold: 1 }
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
                placeholder="Search for a movie!"
            />

            <input type="submit" value="Search" />
        </form>
    );
}
