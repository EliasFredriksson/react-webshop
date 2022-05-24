import "../scss/components/MovieDetailComponent.scss";
import MovieDetailed from "../models/MovieDetailed";
import { useContext, useLayoutEffect, useRef } from "react";
import Movie from "../models/Movie";
import { AppContext, IAppContext } from "../contexts/AppContext";

interface IMovieProps {
    movie: MovieDetailed;
    movieLoaded: boolean;
    exited(): void;
}

const EXCLUDE_VALUES = ["N/A", undefined, ""];
const EXCLUDE_KEYS = ["Poster", "imdbID", "Type", "Error", "Title"];

export default function MovieDetailComponent(props: IMovieProps) {
    let html = <></>;
    const typeString =
        props.movie.Type.slice(0, 1).toUpperCase() + props.movie.Type.slice(1);

    const mediaRef = useRef<HTMLDivElement>(null);
    const imgRef = useRef<HTMLImageElement>(null);
    let validMedia = [];
    let prop: keyof typeof props.movie;
    for (prop in props.movie) {
        let value = props.movie[prop];
        let key = prop.toString();
        if (EXCLUDE_KEYS.includes(key) || EXCLUDE_VALUES.includes(value)) {
            if (key === "Error" && !EXCLUDE_VALUES.includes(value)) {
                validMedia.push([prop, value]);
            }
        } else validMedia.push([prop, value]);
    }

    useLayoutEffect(() => {
        const { current } = mediaRef;
        if (current) {
            setTimeout(() => {
                current.classList.add("__active");
            }, 100);
        }
    }, [props.movieLoaded]);

    window.onpopstate = () => {
        props.exited();
    };

    function getInfoLabel(entry: string[]) {
        let text = "";
        const key = entry[0];
        switch (key) {
            case "Year":
                text = "Released";
                break;
            case "totalSeasons":
                text = "Seasons";
                break;
            default:
                text = entry[0];
                break;
        }
        return (
            <>
                <span className="__label">{text}</span>
            </>
        );
    }
    function getInfoValue(entry: string[]) {
        let text = "";
        const key = entry[0];
        switch (key) {
            case "metaScore":
                text = entry[1] + "/100";
                break;
            default:
                text = entry[1];
                break;
        }
        return (
            <>
                <span>{text}</span>
            </>
        );
    }

    let context = useContext<IAppContext>(AppContext);
    function addToCart() {
        context.updateContext({
            ...context,
            cart: [...context.cart, new Movie({ ...props.movie })],
        });

        console.log("CONTEXT: ", context);
    }

    function handleError() {
        const { current } = imgRef;
        if (current) current.src = "/Missing_Poster.png";
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
                <div className="__back">
                    <span
                        onClick={() => {
                            window.history.back();
                            props.exited();
                        }}
                    >
                        ⇦
                    </span>
                    <button
                        className="__add-to-cart-tablet"
                        onClick={addToCart}
                    >
                        <i className="fa-solid fa-cart-plus"></i>
                    </button>
                </div>
                <div className="__information" ref={mediaRef}>
                    <div className="__left">
                        <div className="__media">
                            <div className="__poster">
                                <img
                                    onError={handleError}
                                    src={props.movie.Poster}
                                    alt={props.movie.Title}
                                    ref={imgRef}
                                />
                            </div>
                        </div>
                        <span className="__title">{props.movie.Title}</span>
                        <div className="__type">
                            <h4>{typeString}</h4>
                        </div>
                        <button className="__add-to-cart-mobile">
                            Add to
                            <i className="fa-solid fa-cart-plus"></i>
                        </button>
                    </div>
                    <div className="__seperator"></div>
                    <div className="__right">
                        {validMedia.map((entry) => {
                            return (
                                <div
                                    key={entry[0]}
                                    className={"__" + entry[0].toLowerCase()}
                                >
                                    <>
                                        {(function () {
                                            return getInfoLabel(entry);
                                        })()}
                                    </>
                                    <>
                                        {(function () {
                                            return getInfoValue(entry);
                                        })()}
                                    </>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        );
    }

    return <>{html}</>;
}
