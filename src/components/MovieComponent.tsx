import { Link } from "react-router-dom";
import Movie from "../models/Movie";
import "../scss/components/Movie.scss";

interface IMovieProps {
    movie: Movie;
}

export default function MovieComponent(props: IMovieProps) {
    const movie = props.movie;

    function goToMovie() {}

    return (
        <Link to={`/movies/${movie.id}`} className="movie" onClick={goToMovie}>
            <div className="__poster">
                <img src={movie.imageUrl} alt={movie.name} />
            </div>
        </Link>
    );
}
