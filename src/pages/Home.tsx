import { useContext, useLayoutEffect, useState } from "react";
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
import { AppContext } from "../contexts/AppContext";
// ### CONTEXT ###

const BLANK_MEDIA: IMovie = {
    Title: "",
    Type: "",
    Poster: "",
    Year: "",
    imdbID: "",
    Error: "",
};

export default function Home() {
    const [page, setPage] = useState(1);
    const [searchText, setSearchText] = useState("Star Wars");
    const [movies, setMovies] = useState<Movie[] | undefined>(undefined);
    const [foundCount, setFoundCount] = useState<number>(0);

    // ### ACCESS TO APP CONTEXT ###
    const context = useContext(AppContext);

    useLayoutEffect(() => {
        if (context.backFromSingleMovie) {
            context.backFromSingleMovie = false;
            fetchMovies(context.searchHistory, context.pageHistory).then(() => {
                setTimeout(() => {
                    window.scrollTo(0, context.windowY);
                }, 100);
            });
        } else fetchMovies(searchText, page);
    }, []);

    // ##### API FETCH #####
    async function fetchMovies(searchText: string, page: number) {
        const service = new MovieService();
        service
            .getMovies(searchText.trim(), page)
            .then((response: IOmbdResponse) => {
                if (response.Response === "False") {
                    setMovies([]);
                    setFoundCount(0);
                    context.countHistory = 0;
                } else {
                    const IMovies = response.Search;
                    let fetchedMovies = IMovies.map((m) => {
                        return new Movie({ ...BLANK_MEDIA, ...m });
                    });
                    setMovies(fetchedMovies);
                    setFoundCount(parseInt(response.totalResults));
                    context.countHistory = parseInt(response.totalResults);
                }
                context.searchHistory = searchText;
                context.pageHistory = page;
                setSearchText(searchText);
                setPage(page);
            });
    }

    function triggerSearch() {
        if (searchText !== context.searchHistory) {
            setMovies(undefined);
            fetchMovies(searchText, 1);
        }
    }

    function triggerPageChange(nextPage: number) {
        if (nextPage !== page) {
            setMovies(undefined);
            // context.windowY = 0;
            fetchMovies(searchText, nextPage);
        }
    }

    // ### DEFAULT (LOADING...) ###
    let html = (
        <>
            <SearchBarComponent
                searchText={searchText}
                setText={setSearchText}
                triggerFetch={triggerSearch}
            ></SearchBarComponent>
            <div className="__loader"></div>
        </>
    );

    if (movies) {
        if (movies.length <= 0) {
            html = (
                <>
                    <SearchBarComponent
                        searchText={searchText}
                        setText={setSearchText}
                        triggerFetch={triggerSearch}
                    ></SearchBarComponent>
                    <h1 className="__no-result">
                        <span>No result...</span>
                        <span>Try again!</span>
                    </h1>
                </>
            );
        }
        // ### MOVIES FOUND ###
        else if (movies.length > 0) {
            html = (
                <>
                    <SearchBarComponent
                        searchText={searchText}
                        setText={setSearchText}
                        triggerFetch={triggerSearch}
                    ></SearchBarComponent>

                    <PaginationComponent
                        currentPage={page}
                        setPage={triggerPageChange}
                        foundCount={foundCount}
                    ></PaginationComponent>
                    <p className="__total-result">
                        "{context.searchHistory.trim()}" gave {foundCount} hits.
                    </p>
                    <MovieBrowse movies={movies}></MovieBrowse>
                    <a className="__scroll-top-button" href="#scroll-to-top">
                        <i className="fa-solid fa-arrow-up"></i>
                    </a>
                </>
            );
        }
    }

    return <main className="movie-browser">{html}</main>;
}
