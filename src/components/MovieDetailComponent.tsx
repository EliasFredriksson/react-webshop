// import Movie from "../models/Movie";
import MovieService from "../services/MovieService";

interface IMovieProps {
    movieId: number;
}

export default function MovieDetailComponent(props: IMovieProps) {
    const currentMovieId = props.movieId;
    const service = new MovieService();

    return (
        <div className="detailed-movie">
            <h1>{currentMovieId}</h1>
        </div>
    );
}
