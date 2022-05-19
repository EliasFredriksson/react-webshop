// ### ROUTER ###
import { useLayoutEffect, useState } from "react";
import { useParams } from "react-router-dom";
// ### COMPONENTS ###
import MovieDetailComponent from "../components/MovieDetailComponent";
// ### MODELS ###
import IMovieDetailed from "../interface/IMovieDetailed";
import MovieDetailed from "../models/MovieDetailed";
// ### SERVICES ###
import MovieService from "../services/MovieService";

const BLANK_DETAILED_MOVIE = {
    Title: "",
    Year: "",
    Poster: "",
    imdbID: "",
    Type: "",
    Error: "",
    Director: "",
    Writer: "",
    Actors: "",
    Genre: "",
    Plot: "",
    Runtime: "",
    Metascore: "",
    Awards: "",
    Released: "",
    BoxOffice: "",
    Rated: "",
};

export default function SingleMovie() {
    const [movie, setMovie] = useState<MovieDetailed>(
        new MovieDetailed(BLANK_DETAILED_MOVIE)
    );

    const params = useParams();
    const movieIdParam: string | undefined = params.id;
    const service = new MovieService();

    // console.log("PARAM: ", movieIdParam);
    let movieId: string = "";
    if (movieIdParam !== undefined) {
        movieId = movieIdParam;
    }
    async function getMovie() {
        service.getMovieById(movieId).then((IMovieDetailed: IMovieDetailed) => {
            if (IMovieDetailed.Error) {
                setMovie(
                    new MovieDetailed({
                        ...BLANK_DETAILED_MOVIE,
                        Title: `!!! ERROR !!!`,
                        imdbID: `${movieId}`,
                        Error: IMovieDetailed.Error,
                    })
                );
            } else {
                setMovie(new MovieDetailed(IMovieDetailed));
            }
        });
    }
    useLayoutEffect(() => {
        getMovie();
    }, []);

    return (
        <>
            <MovieDetailComponent movie={movie}></MovieDetailComponent>
        </>
    );
}
