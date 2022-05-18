// import Movie from "../models/Movie";
import Movie from "../models/Movie";
import MovieService from "../services/MovieService";
import IMovie from "../interface/IMovie";
import { useEffect, useState } from "react";
import "../scss/components/MovieDetailComponent.scss";

interface IMovieProps {
    movieId: string;
}

export default function MovieDetailComponent(props: IMovieProps) {
    const [movie, setMovie] = useState<Movie>(
        new Movie({
            Title: "",
            Year: "",
            Poster: "",
            imdbID: "",
            Type: "",
        })
    );
    const currentMovieId = props.movieId;
    const service = new MovieService();

    useEffect(() => {
        console.log(currentMovieId);
        service.getMovieById(currentMovieId).then((IMovie: IMovie) => {
            console.log("MOVIE: ", IMovie);
            setMovie(new Movie(IMovie));
        });
    });

    return (
        <div className="detailed-movie">
            <h1>{movie.Title}</h1>
            <div className="poster">
                <img src={movie.Poster} alt="" />
            </div>
        </div>
    );
}
