import { useEffect, useState } from "react";
import "../scss/components/Main.scss";
// ### INTERFACE ###
import IMovie from "../interface/IMovie";
// ### MOVIES ###
import Movie from "../models/Movie";
import MovieService from "../services/MovieService";
// ### COMPONENTS ###
import MovieComponent from "./MovieComponent";

export default function MovieBrowse() {
    let currentMovies: Movie[] = [];
    const [movies, setMovies] = useState(currentMovies);

    useEffect(() => {
        getMovies();
    }, []);

    async function getMovies() {
        const service = new MovieService();
        service.getMovies().then((IMovies: IMovie[]) => {
            let fetchedMovies: Movie[] = [];
            IMovies.forEach((m) => {
                fetchedMovies.push(new Movie(m));
            });
            setMovies(fetchedMovies);
        });
    }

    return (
        <main>
            <div className="movies-container">
                {movies.map((movie: Movie) => (
                    <MovieComponent
                        movie={movie}
                        key={movie.id}
                    ></MovieComponent>
                ))}
            </div>
        </main>
    );
}
