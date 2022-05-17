// ### ROUTER ###
import { useParams } from "react-router-dom";
// ### COMPONENTS ###
import MovieDetailComponent from "../components/MovieDetailComponent";
import HeaderComponent from "../components/HeaderComponent";
import FooterComponent from "../components/FooterComponent";

export default function SingleMovie() {
    const params = useParams();

    const movieIdParam: string | undefined = params.movieId;
    let movieId: number = -1;
    if (movieIdParam != undefined) {
        movieId = parseInt(movieIdParam);
    }
    return (
        <>
            <HeaderComponent></HeaderComponent>
            <MovieDetailComponent movieId={movieId}></MovieDetailComponent>
            <FooterComponent></FooterComponent>
        </>
    );
}
