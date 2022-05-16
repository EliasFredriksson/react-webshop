// import Movie from "../models/Movie";
import MovieService from "../services/MovieService";

interface IMovieProps {
    movieId: number;
}

export default function MovieDetailComponent(props: IMovieProps) {
    const currentMovie = props.movieId;
    const service = new MovieService();

    return (
        <div className="detailed-movie">
            <h1>{currentMovie}</h1>
        </div>
    );
}
