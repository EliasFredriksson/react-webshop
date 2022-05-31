import { useContext, useLayoutEffect, useState } from "react";
import "../../scss/components/Home.scss";
// ### COMPONENTS ###
import SearchBar from "../SearchBar";
import Pagination from "../Pagination";
import MediaBrowse from "../MediaBrowse";
// ### MODELS ###
import Media from "../../models/Media";
// ### INTERFACES ###
import IMedia from "../../interface/IMedia";
import IOmbdResponse from "../../interface/IOmdbResponse";
// ### SERVICES ###
import OmdbService from "../../services/OmdbService";
// ### CONTEXT ###
import { AppContext } from "../../contexts/AppContext";

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
        // console.log("CONTEXT: ");
        // console.table(context);
        if (context.backFromSingleMovie) {
            context.updateContext({
                ...context,
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
        const service = new OmdbService();
        service
            .getMovies(searchText.trim(), page)
            .then((response: IOmbdResponse) => {
                let foundAmount = 0;
                if (response.Response === "False") {
                    setMedia([]);
                    setFoundCount(0);
                } else {
                    const IMedia = response.Search;
                    const fetchedMedia = IMedia.map((m: IMedia) => {
                        return new Media({ ...BLANK_MEDIA, ...m });
                    });
                    setMedia(fetchedMedia);
                    setFoundCount(parseInt(response.totalResults));
                    foundAmount = parseInt(response.totalResults);
                }

                context.updateContext({
                    ...context,
                    countHistory: foundAmount,
                    searchHistory: searchText,
                    pageHistory: page,
                });
                setSearchText(searchText);
                setPage(page);
            });
    }

    // ### SEARCH TRIGGER ###
    function triggerSearch() {
        if (searchText !== context.searchHistory) {
            window.scrollTo(0, 0);
            setMedia(undefined);
            fetchMovies(searchText, 1);
        }
    }

    // ### PAGINATION TRIGGER ###
    function triggerPageChange(nextPage: number) {
        if (nextPage !== page) {
            window.scrollTo(0, 0);
            setMedia(undefined);
            setPage(nextPage);
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
