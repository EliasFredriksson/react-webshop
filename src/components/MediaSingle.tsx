import "../scss/components/MediaSingle.scss";
import { useContext, useLayoutEffect, useRef } from "react";
// ### CONTEXT ###
import { AppContext } from "../contexts/AppContext";
// ### MODELS ###
import MediaDetailed from "../models/MovieDetailed";
import Media from "../models/Media";

interface IMediaSingleProps {
    media: MediaDetailed;
    mediaLoaded: boolean;
    exited(): void;
}

const EXCLUDE_VALUES = ["N/A", undefined, ""];
const EXCLUDE_KEYS = ["Poster", "imdbID", "Type", "Error", "Title"];

export default function MovieSingle(props: IMediaSingleProps) {
    const typeString =
        props.media.Type.slice(0, 1).toUpperCase() + props.media.Type.slice(1);

    let validMedia = [];
    let prop: keyof typeof props.media;
    for (prop in props.media) {
        let value = props.media[prop];
        let key = prop.toString();
        if (EXCLUDE_KEYS.includes(key) || EXCLUDE_VALUES.includes(value)) {
            if (key === "Error" && !EXCLUDE_VALUES.includes(value)) {
                validMedia.push([prop, value]);
            }
        } else validMedia.push([prop, value]);
    }

    // ### LAYOUTEFFECT ###
    const mediaRef = useRef<HTMLDivElement>(null);
    useLayoutEffect(() => {
        const { current } = mediaRef;
        if (current) {
            setTimeout(() => {
                current.classList.add("__active");
            }, 100);
        }
    }, [props.mediaLoaded]);

    // ### RUN .exited() FUNCTION WHEN history.back() ###
    window.onpopstate = () => {
        props.exited();
    };

    // ### GET LABEL AND VALUE ###
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

    // ### ADD TO CART IN CONTEXT ###
    let context = useContext(AppContext);
    function addToCart() {
        context.updateContext({
            cart: [...context.cart, new Media({ ...props.media })],
        });
    }

    // ### HANDLE IMAGE LOAD ERROR ###
    const imgRef = useRef<HTMLImageElement>(null);
    function handleError() {
        const { current } = imgRef;
        if (current) current.src = "/Missing_Poster.png";
    }

    let html = <></>;
    // ### DEFAULT LOADER ###
    if (!props.mediaLoaded) {
        html = (
            <div className="detailed-media">
                <div className="__loader"></div>
            </div>
        );
    }
    // ### DATA IS LOADED ###
    else {
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
                                    src={props.media.Poster}
                                    alt={props.media.Title}
                                    ref={imgRef}
                                />
                            </div>
                        </div>
                        <span className="__title">{props.media.Title}</span>
                        <div className="__type">
                            <h4>{typeString}</h4>
                        </div>
                        <button
                            className="__add-to-cart-mobile"
                            onClick={addToCart}
                        >
                            Add to cart
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
