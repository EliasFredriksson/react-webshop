import { ChangeEvent } from "react";
import "../scss/components/SearchBarComponent.scss";

interface ISearchBarProps {
    searchText: string;
    setText: Function;
    triggerFetch: Function;
    placeholder: string;
}

export default function SearchBarDesktop(props: ISearchBarProps) {
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
                placeholder={props.placeholder}
            />
            <input type="submit" value="Search" />
        </form>
    );
}
