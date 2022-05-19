import "../scss/components/MovieBrowse.scss";

// ### MOVIES ###
import Movie from "../models/Movie";

// ### COMPONENTS ###
import MovieComponent from "./MovieComponent";

interface IMovieBrowse {
    movies: Movie[];
}

export default function MovieBrowse(props: IMovieBrowse) {
    return (
        <div className="movies-container">
            {props.movies.map((movie: Movie) => (
                <MovieComponent
                    movie={movie}
                    key={movie.imdbID}
                ></MovieComponent>
            ))}
        </div>
    );
}
