import "../scss/components/MovieDetailComponent.scss";
import MovieDetailed from "../models/MovieDetailed";

interface IMovieProps {
    movie: MovieDetailed;
    movieLoaded: boolean;
    exited: Function;
}

export default function MovieDetailComponent(props: IMovieProps) {
    let html = <></>;
    const typeString =
        props.movie.Type.slice(0, 1).toUpperCase() + props.movie.Type.slice(1);

    let validMedia = [];
    let prop: keyof typeof props.movie;
    for (prop in props.movie) {
        let value = props.movie[prop];
        if (
            value !== "N/A" &&
            value !== undefined &&
            prop !== "Poster" &&
            prop !== "imdbID" &&
            prop !== "Title" &&
            prop !== "Type"
        ) {
            validMedia.push([prop, value]);
        }
    }

    if (!props.movieLoaded) {
        html = (
            <div className="detailed-media">
                <div className="__loader"></div>
            </div>
        );
    } else {
        html = (
            <div className="detailed-media">
                <div
                    className="__back"
                    onClick={() => {
                        window.history.back();
                        props.exited();
                    }}
                >
                    <span>⇦</span>
                </div>
                <div className="__information">
                    <div className="__left">
                        <div className="__media">
                            <div className="__poster">
                                <img
                                    src={props.movie.Poster}
                                    alt={props.movie.Title}
                                />
                            </div>
                        </div>
                        <span className="__title">{props.movie.Title}</span>
                        <div className="__type">
                            <h4>{typeString}</h4>
                        </div>
                    </div>
                    <div className="__seperator"></div>
                    <div className="__right">
                        {validMedia.map((entry) => {
                            return (
                                <div
                                    key={entry[0]}
                                    className={"__" + entry[0].toLowerCase()}
                                >
                                    <span className="__label">
                                        {entry[0] === "totalSeasons" ? (
                                            <>Seasons</>
                                        ) : (
                                            <>{entry[0]}</>
                                        )}
                                    </span>

                                    <span>
                                        <>
                                            {entry[1]}
                                            {entry[0] === "Metascore" ? (
                                                <span>/100</span>
                                            ) : (
                                                <></>
                                            )}
                                        </>
                                    </span>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        );
    }
    // <>
    //     {validMedia.map((entry) => {
    //         return (
    //             <div
    //                 key={entry[0]}
    //                 className={"__" + entry[0].toLowerCase()}
    //             >
    //                 <span>{entry[0]}</span>
    //                 <span>{entry[1]}</span>
    //             </div>
    //         );
    //     })}
    // </>

    return <>{html}</>;
}
