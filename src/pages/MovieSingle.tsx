import { useContext, useLayoutEffect, useState } from "react";
// ### ROUTER ###
import { useParams } from "react-router-dom";
// ### COMPONENTS ###
import MediaSingle from "../components/MediaSingle";
// ### INTERFACES ###
import IMediaDetailed from "../interface/IMediaDetailed";
// ### MODELS ###
import MediaDetailed from "../models/MovieDetailed";
// ### SERVICES ###
import OmdbService from "../services/OmdbService";
// ### CONTEXT ###
import { AppContext } from "../contexts/AppContext";

const BLANK_DETAILED_MOVIE = {
    Title: "",
    Year: "",
    Poster: "",
    imdbID: "",
    Type: "",
    Error: "",
    Director: "",
    Writer: "",
    Actors: "",
    Genre: "",
    Plot: "",
    Runtime: "",
    Metascore: "",
    Awards: "",
    Released: "",
    BoxOffice: "",
    Rated: "",
    totalSeasons: "",
};

export default function MovieSingle() {
    const [mediaLoaded, setMediaLoaded] = useState(false);
    const [media, setMedia] = useState<MediaDetailed>(
        new MediaDetailed(BLANK_DETAILED_MOVIE)
    );

    const params = useParams();
    const movieIdParam: string | undefined = params.id;
    const service = new OmdbService();

    const context = useContext(AppContext);

    let mediaId: string = "";
    if (movieIdParam !== undefined) {
        mediaId = movieIdParam;
    }

    function getStoredMovie(): MediaDetailed {
        let storedData = localStorage.getItem("singleMovie");
        if (storedData) {
            let IMediaStored: IMediaDetailed = JSON.parse(storedData);
            return new MediaDetailed(IMediaStored);
        }
        return new MediaDetailed(BLANK_DETAILED_MOVIE);
    }
    function storeMovie(media: MediaDetailed): void {
        localStorage.setItem("singleMovie", JSON.stringify(media));
    }
    async function getMovie() {
        // console.log("\n\n ############# FETCH OCCURED ############# \n\n");
        service.getMovieById(mediaId).then((IMediaDetailed: IMediaDetailed) => {
            if (IMediaDetailed.Error) {
                const errorMedia = new MediaDetailed({
                    ...BLANK_DETAILED_MOVIE,
                    Title: `!!! ERROR !!!`,
                    imdbID: `${mediaId}`,
                    Error: IMediaDetailed.Error,
                });
                setMedia(errorMedia);
                storeMovie(errorMedia);
            } else {
                const foundMedia = new MediaDetailed(IMediaDetailed);
                setMedia(foundMedia);
                storeMovie(foundMedia);
            }
            setMediaLoaded(true);
        });
    }

    useLayoutEffect(() => {
        const storedMedia = getStoredMovie();
        if (storedMedia.imdbID === mediaId) {
            // console.log("STORED MOVIE MATCHED");
            setMedia(storedMedia);
            setMediaLoaded(true);
        } else {
            // console.log("STORED MOVIE DID NOT MATCH");
            getMovie();
        }
    }, []);

    return (
        <>
            <MediaSingle
                media={media}
                mediaLoaded={mediaLoaded}
                exited={() => {
                    setMedia(BLANK_DETAILED_MOVIE);
                    setMediaLoaded(false);
                    context.updateContext({
                        ...context,
                        backFromSingleMovie: true,
                    });
                }}
            ></MediaSingle>
        </>
    );
}
