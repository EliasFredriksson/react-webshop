// import Movie from "../models/Movie";
import MovieService from "../services/MovieService";
import IMovie from "../interface/IMovie";
import { useEffect, useState } from "react";
import "../scss/components/MovieDetailComponent.scss";
import Movie from "../models/Movie";
import MovieDetailed from "../models/MovieDetailed";

interface IMovieProps {
    movie: MovieDetailed;
}

export default function MovieDetailComponent(props: IMovieProps) {
    console.log(props.movie);

    return (
        <div className="detailed-movie">
            <h1>{props.movie.Title}</h1>
            <div className="poster">
                <img src={props.movie.Poster} alt="" />
            </div>
        </div>
    );
}
