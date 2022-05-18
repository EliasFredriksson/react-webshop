// ### COMPONENTS ###
import { useEffect, useState } from "react";
import MovieBrowse from "../components/MovieBrowse";
import IMovie from "../interface/IMovie";
import Movie from "../models/Movie";
import MovieService from "../services/MovieService";

export default function Home() {
    const [movies, setMovies] = useState<Movie[]>([]);
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
            // console.log("IMOVIES: ", IMovies);
            let fetchedMovies: Movie[] = [];
            IMovies.forEach((m) => {
                fetchedMovies.push(new Movie(m));
            });

            setMovies(fetchedMovies);
            storeMovies(fetchedMovies);
        });
    }

    function triggerFetch() {
        setMovies([]);
        fetchMovies(searchText);
    }

    return (
        <>
            <MovieBrowse
                movies={movies}
                triggerSearch={triggerFetch}
                searchText={searchText}
                setSearchText={setSearchText}
            ></MovieBrowse>
        </>
    );
}
