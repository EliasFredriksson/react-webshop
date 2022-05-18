import "../scss/components/Main.scss";

// ### MOVIES ###
import Movie from "../models/Movie";

// ### COMPONENTS ###
import MovieComponent from "./MovieComponent";
import SearchBarComponent from "./SearchBarComponent";

interface IMovieBrowse {
    movies: Movie[];
    triggerSearch: Function;
    searchText: string;
    setSearchText: Function;
}

export default function MovieBrowse(props: IMovieBrowse) {
    return (
        <main>
            <SearchBarComponent
                searchText={props.searchText}
                setText={props.setSearchText}
                triggerFetch={props.triggerSearch}
                placeholder="Search for a movie!"
            ></SearchBarComponent>
            <div className="movies-container">
                {props.movies.map((movie: Movie) => (
                    <MovieComponent
                        movie={movie}
                        key={movie.imdbID}
                    ></MovieComponent>
                ))}
            </div>
        </main>
    );
}
