import { useContext, useLayoutEffect, useState } from "react";
import "../scss/components/Home.scss";
// ### COMPONENTS ###
import SearchBar from "../components/SearchBar";
import Pagination from "../components/Pagination";
import MediaBrowse from "../components/MediaBrowse";
// ### MODELS ###
import Media from "../models/Media";
// ### INTERFACES ###
import IMedia from "../interface/IMedia";
import IOmbdResponse from "../interface/IOmdbResponse";
// ### SERVICES ###
import MovieService from "../services/OmdbService";
// ### CONTEXT ###
import { AppContext } from "../contexts/AppContext";

const BLANK_MEDIA: IMedia = {
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
    const [media, setMedia] = useState<Media[] | undefined>(undefined);
    const [foundCount, setFoundCount] = useState<number>(0);

    // ### ACCESS TO APP CONTEXT ###
    const context = useContext(AppContext);

    useLayoutEffect(() => {
        if (context.backFromSingleMovie) {
            console.log("CONTEXT: ", context);
            context.updateContext({
                backFromSingleMovie: false,
            });
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
                    setMedia([]);
                    setFoundCount(0);
                    context.updateContext({
                        countHistory: 0,
                        searchHistory: searchText,
                        pageHistory: page,
                    });
                } else {
                    const IMedia = response.Search;
                    const fetchedMedia = IMedia.map((m: IMedia) => {
                        return new Media({ ...BLANK_MEDIA, ...m });
                    });
                    setMedia(fetchedMedia);
                    setFoundCount(parseInt(response.totalResults));
                    context.updateContext({
                        countHistory: parseInt(response.totalResults),
                        searchHistory: searchText,
                        pageHistory: page,
                    });
                }

                setSearchText(searchText);
                setPage(page);
            });
    }

    // ### SEARCH TRIGGER ###
    function triggerSearch() {
        if (searchText !== context.searchHistory) {
            setMedia(undefined);
            fetchMovies(searchText, 1);
        }
    }

    // ### PAGINATION TRIGGER ###
    function triggerPageChange(nextPage: number) {
        if (nextPage !== page) {
            setMedia(undefined);
            fetchMovies(searchText, nextPage);
        }
    }

    // ### DEFAULT (LOADING...) ###
    let html = <div className="__loader"></div>;

    if (media) {
        if (media.length <= 0) {
            html = (
                <h1 className="__no-result">
                    <span>No result...</span>
                    <span>Try again!</span>
                </h1>
            );
        }
        // ### MOVIES FOUND ###
        else if (media.length > 0) {
            html = (
                <>
                    <Pagination
                        currentPage={page}
                        setPage={triggerPageChange}
                        foundCount={foundCount}
                    ></Pagination>
                    <p className="__total-result">
                        "{context.searchHistory.trim()}" gave {foundCount} hits.
                    </p>
                    <MediaBrowse media={media}></MediaBrowse>
                    <a className="__scroll-top-button" href="#scroll-to-top">
                        <i className="fa-solid fa-arrow-up"></i>
                    </a>
                </>
            );
        }
    }

    return (
        <main className="movie-browser">
            <SearchBar
                searchText={searchText}
                setText={setSearchText}
                triggerFetch={triggerSearch}
            ></SearchBar>
            {html}
        </main>
    );
}
