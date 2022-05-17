import { ChangeEvent } from "react";

interface ISearchBarProps {
    searchText: string;
    setText: Function;
    triggerFetch: Function;
}

export default function SearchBarComponent(props: ISearchBarProps) {
    function handleSubmit(e: ChangeEvent<HTMLFormElement>) {
        e.preventDefault();
        props.triggerFetch();
    }

    return (
        <form onSubmit={handleSubmit} className="search-bar">
            <input
                type="text"
                onChange={(event) => {
                    props.setText(event.target.value);
                }}
                value={props.searchText}
            />
            <input type="submit" value="Search" />
        </form>
    );
}
