import Movie from "../models/Movie";
import "../scss/components/Movie.scss";

interface IMovieProps {
    movie: Movie;
}

export default function MovieComponent(props: IMovieProps) {
    const movie = props.movie;
    return (
        <div className="movie">
            <div className="__poster">
                <img src={movie.imageUrl} alt={movie.name} />
            </div>
        </div>
    );
}
