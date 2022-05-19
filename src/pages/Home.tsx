import { useLayoutEffect, useState } from "react";
import "../scss/components/Home.scss";
// ### COMPONENTS ###
import MovieBrowse from "../components/MovieBrowse";
import SearchBarComponent from "../components/SearchBarComponent";
// ### MODELS ###
import Movie from "../models/Movie";
// ### INTERFACES ###
import IMovie from "../interface/IMovie";
// ### SERVICES ###
import MovieService from "../services/MovieService";
import PaginationComponent from "../components/PaginationComponent";
import IOmbdResponse from "../interface/IOmdbResponse";

export default function Home() {
    const [page, setPage] = useState(1);
    const [foundCount, setFoundCount] = useState(0);
    const [movies, setMovies] = useState<Movie[]>([]);
    const [searchText, setSearchText] = useState("star");
    const [foundMovies, setFoundMovies] = useState<boolean | undefined>(
        undefined
    );

    useLayoutEffect(() => {
        fetchMovies(searchText, page);
        const storedMovies: Movie[] = getStoredMovies();
        if (storedMovies.length > 0) setMovies(storedMovies);
    }, [page]);

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
    async function fetchMovies(searchText: string = "star", page: number = 1) {
        const service = new MovieService();
        setFoundMovies(undefined);
        service.getMovies(searchText, page).then((response: IOmbdResponse) => {
            if (response.Response === "False") {
                setMovies([]);
                setFoundMovies(false);
            } else {
                const IMovies = response.Search;
                let fetchedMovies: Movie[] = [];
                IMovies.forEach((m) => {
                    fetchedMovies.push(new Movie(m));
                });

                setFoundCount(parseInt(response.totalResults));
                setMovies(fetchedMovies);
                setFoundMovies(true);
                storeMovies(fetchedMovies);
            }
        });
    }

    function triggerFetch() {
        setMovies([]);
        fetchMovies(searchText, page);
        setPage(1);
    }
    // ### DEFAULT (LOADING...) ###
    let html = (
        <>
            <SearchBarComponent
                searchText={searchText}
                setText={setSearchText}
                triggerFetch={triggerFetch}
            ></SearchBarComponent>
            <div className="__loader"></div>
        </>
    );
    // ### NO MOVIES FOUND ###
    if (foundMovies === false) {
        html = (
            <>
                <SearchBarComponent
                    searchText={searchText}
                    setText={setSearchText}
                    triggerFetch={triggerFetch}
                ></SearchBarComponent>
                <h1 className="__no-result">
                    <span>No result...</span>
                    <span>Try again!</span>
                </h1>
            </>
        );
    }
    // ### MOVIES FOUND ###
    else if (foundMovies === true) {
        html = (
            <>
                <SearchBarComponent
                    searchText={searchText}
                    setText={setSearchText}
                    triggerFetch={triggerFetch}
                ></SearchBarComponent>

                <PaginationComponent
                    currentPage={page}
                    setPage={setPage}
                    foundCount={foundCount}
                ></PaginationComponent>
                <p className="__total-result">Total hits: {foundCount}</p>
                <MovieBrowse movies={movies}></MovieBrowse>
                <a className="__scroll-top-button" href="#scroll-to-top">
                    <span>⮉</span>
                </a>
            </>
        );
    }

    return <main className="movie-browser">{html}</main>;
}
