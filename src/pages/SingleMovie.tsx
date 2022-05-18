// ### ROUTER ###
import { useParams } from "react-router-dom";
// ### COMPONENTS ###
import MovieDetailComponent from "../components/MovieDetailComponent";

export default function SingleMovie() {
    const params = useParams();
    const movieIdParam: string | undefined = params.id;
    // console.log("PARAM: ", movieIdParam);
    let movieId: string = "";
    if (movieIdParam !== undefined) {
        movieId = movieIdParam;
    }
    return (
        <>
            <MovieDetailComponent movieId={movieId}></MovieDetailComponent>
        </>
    );
}
