// ### COMPONENTS ###
import MovieDetailComponent from "../components/MovieDetailComponent";

import { useParams } from "react-router-dom";

export default function SingleMovie() {
    const params = useParams();

    const movieIdParam: string | undefined = params.movieId;
    let movieId: number = -1;
    if (movieIdParam != undefined) {
        movieId = parseInt(movieIdParam);
    }
    return (
        <>
            <MovieDetailComponent movieId={movieId}></MovieDetailComponent>
        </>
    );
}
