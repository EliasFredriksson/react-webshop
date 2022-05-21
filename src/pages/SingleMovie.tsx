// ### ROUTER ###
import { useContext, useLayoutEffect, useState } from "react";
import { useParams } from "react-router-dom";
// ### COMPONENTS ###
import MovieDetailComponent from "../components/MovieDetailComponent";
// ### MODELS ###
import IMovieDetailed from "../interface/IMovieDetailed";
import MovieDetailed from "../models/MovieDetailed";
// ### SERVICES ###
import MovieService from "../services/MovieService";
// ### CONTEXT ###
import { AppContext } from "../App";

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
    totalSeasons: "",
};

export default function SingleMovie() {
    const [movieLoaded, setMovieLoaded] = useState(false);
    const [movie, setMovie] = useState<MovieDetailed>(
        new MovieDetailed(BLANK_DETAILED_MOVIE)
    );

    const params = useParams();
    const movieIdParam: string | undefined = params.id;
    const service = new MovieService();

    const context = useContext(AppContext);

    let movieId: string = "";
    if (movieIdParam !== undefined) {
        movieId = movieIdParam;
    }

    function getStoredMovie(): MovieDetailed {
        let storedData = localStorage.getItem("singleMovie");
        if (storedData) {
            let IMovieDetailed: IMovieDetailed = JSON.parse(storedData);
            return new MovieDetailed(IMovieDetailed);
        }
        return new MovieDetailed(BLANK_DETAILED_MOVIE);
    }
    function storeMovie(movie: MovieDetailed): void {
        localStorage.setItem("singleMovie", JSON.stringify(movie));
    }
    async function getMovie() {
        // console.log("\n\n ############# FETCH OCCURED ############# \n\n");
        service.getMovieById(movieId).then((IMovieDetailed: IMovieDetailed) => {
            if (IMovieDetailed.Error) {
                const errorMovie = new MovieDetailed({
                    ...BLANK_DETAILED_MOVIE,
                    Title: `!!! ERROR !!!`,
                    imdbID: `${movieId}`,
                    Error: IMovieDetailed.Error,
                });
                setMovie(errorMovie);
                storeMovie(errorMovie);
            } else {
                const foundMovie = new MovieDetailed(IMovieDetailed);
                setMovie(foundMovie);
                storeMovie(foundMovie);
            }
            setMovieLoaded(true);
        });
    }
    useLayoutEffect(() => {
        const storedMovie = getStoredMovie();
        if (storedMovie.imdbID === movieId) {
            // console.log("STORED MOVIE MATCHED");
            setMovie(storedMovie);
            setMovieLoaded(true);
        } else {
            // console.log("STORED MOVIE DID NOT MATCH");
            getMovie();
        }
    }, []);

    return (
        <>
            <MovieDetailComponent
                movie={movie}
                movieLoaded={movieLoaded}
                exited={() => {
                    setMovie(BLANK_DETAILED_MOVIE);
                    setMovieLoaded(false);
                    context.backFromSingleMovie = true;
                }}
            ></MovieDetailComponent>
        </>
    );
}
