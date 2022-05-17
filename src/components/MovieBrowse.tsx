import { useEffect, useState } from "react";
import "../scss/components/Main.scss";
// ### INTERFACE ###
import IMovie from "../interface/IMovie";
// ### MOVIES ###
import Movie from "../models/Movie";
import MovieService from "../services/MovieService";
// ### COMPONENTS ###
import MovieComponent from "./MovieComponent";
import SearchBarComponent from "./SearchBarComponent";

export default function MovieBrowse() {
    let currentMovies: Movie[] = [];
    const [movies, setMovies] = useState(currentMovies);
    const [searchText, setSearchText] = useState("star");

    useEffect(() => {
        const storedMovies: Movie[] = getStoredMovies();
        // console.log("STORED: ", storedMovies);
        if (storedMovies.length <= 0) fetchMovies();
        else setMovies(storedMovies);
    }, []);

    // ##### LOCAL STORAGE #####
    function getStoredMovies(): Movie[] {
        let storedData = localStorage.getItem("movies");
        if (storedData) {
            let IMovies: IMovie[] = JSON.parse(storedData);
            return IMovies.map((m: IMovie) => {
                return new Movie(m);
            });
        }
        return [];
    }
    function storeMovies(movies: Movie[]): void {
        localStorage.setItem("movies", JSON.stringify(movies));
    }

    // ##### API FETCH #####
    async function fetchMovies(searchText: string = "star") {
        const service = new MovieService();
        service.getMovies(searchText).then((IMovies: IMovie[]) => {
            console.log("IMOVIES: ", IMovies);
            let fetchedMovies: Movie[] = [];
            IMovies.forEach((m) => {
                fetchedMovies.push(new Movie(m));
            });

            setMovies(fetchedMovies);
            storeMovies(fetchedMovies);
        });
    }

    return (
        <main>
            <SearchBarComponent
                searchText={searchText}
                setText={setSearchText}
                triggerFetch={() => {
                    fetchMovies(searchText);
                }}
            ></SearchBarComponent>
            <div className="movies-container">
                {movies.map((movie: Movie) => (
                    <MovieComponent
                        movie={movie}
                        key={movie.imdbID}
                    ></MovieComponent>
                ))}
            </div>
        </main>
    );
}
