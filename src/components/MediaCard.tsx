import { useContext, useLayoutEffect, useRef, useState } from "react";
import "../scss/components/MediaCard.scss";
// ### ROUTER ###
import { Link } from "react-router-dom";
// ### CONTEXT ###
import { AppContext } from "../contexts/AppContext";
// ### MODELS ###
import Media from "../models/Media";

interface IMediaCardProps {
    media: Media;
}

export default function MediaCard(props: IMediaCardProps) {
    const media = props.media;
    const [visible, setVisible] = useState(false);
    const [fadedOut, setFadedOut] = useState(true);
    const observerThreshold = 0.3;

    const context = useContext(AppContext);

    // ### REF ###
    // Reference to itself in the DOM. so we can change the class.
    const imgRef = useRef<HTMLImageElement>(null);
    const movieRef = useRef<HTMLAnchorElement>(null);

    useLayoutEffect(() => {
        // ### OBSERVER ###
        // observers are used to detect when something is inside the viewport.
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) showCard();
                });
            },
            {
                threshold: observerThreshold,
            }
        );
        const { current } = movieRef;
        if (!current) return;
        observer.observe(current);
        return () => {
            observer.unobserve(current);
        };
    }, []);

    function showCard() {
        setVisible(true);
        setFadedOut(false);
    }

    function handleClick() {
        context.updateContext({
            ...context,
            windowY: window.visualViewport.pageTop,
        });
    }

    function handleError() {
        const { current } = imgRef;
        if (current) current.src = "/Missing_Poster.png";
    }

    return (
        <Link
            to={`/media/${media.imdbID}`}
            className={`media-card ${fadedOut ? "fade-in" : ""} ${
                visible ? "appear" : ""
            }`}
            ref={movieRef}
            onClick={handleClick}
        >
            <div className="__poster">
                <img
                    src={media.Poster}
                    alt={media.Title}
                    onError={handleError}
                    ref={imgRef}
                />
            </div>
            <span className="__info">{media.Title}</span>
        </Link>
    );
}
