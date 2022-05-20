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
    const [page, setPage] = useState<number>(1);
    const [searchText, setSearchText] = useState("");
    const [movies, setMovies] = useState<Movie[]>([]);
    const [foundCount, setFoundCount] = useState<number | undefined>(undefined);

    useLayoutEffect(() => {
        const isHistoryBack = sessionStorage.getItem("historyBack");
        if (isHistoryBack === "true") {
            sessionStorage.setItem("historyBack", "false");
            const storedPage = sessionStorage.getItem("lastPage");
            const storedSearch = sessionStorage.getItem("lastSearch");
            const foundCount = sessionStorage.getItem("foundCount");
            if (storedPage) setPage(parseInt(storedPage));
            if (storedSearch) setSearchText(storedSearch);
            if (foundCount) setFoundCount(parseInt(foundCount));
            const storedMovies = getStoredMovies();
            setMovies(storedMovies);
        } else {
            triggerFetch();
        }
    }, [page]); // We add page to observed list. (It will run if page changes.)

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
    function storeMovies(): void {
        localStorage.setItem("movies", JSON.stringify(movies));
    }

    // ##### API FETCH #####
    async function fetchMovies(searchText: string = "star", page: number = 1) {
        const service = new MovieService();
        service.getMovies(searchText, page).then((response: IOmbdResponse) => {
            if (response.Response === "False") {
                setMovies([]);
                setFoundCount(0);
                storeMovies();
                sessionStorage.setItem("foundCount", "0");
            } else {
                const IMovies = response.Search;
                let fetchedMovies: Movie[] = [];
                IMovies.forEach((m) => {
                    fetchedMovies.push(new Movie(m));
                });
                setMovies(fetchedMovies);
                setFoundCount(parseInt(response.totalResults));
                storeMovies();
                sessionStorage.setItem("foundCount", response.totalResults);
            }
        });
    }

    function triggerFetch(searchTerm: string = searchText) {
        sessionStorage.setItem("lastSearch", searchTerm);
        sessionStorage.setItem("lastPage", page.toString());
        setMovies([]);
        fetchMovies(searchTerm, page);
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
    if (foundCount !== undefined) {
        if (foundCount <= 0) {
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
        else if (foundCount > 0) {
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
    }

    return <div className="movie-browser">{html}</div>;
}
