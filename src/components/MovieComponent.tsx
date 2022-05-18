import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import Movie from "../models/Movie";
import "../scss/components/Movie.scss";

interface IMovieProps {
    movie: Movie;
}

export default function MovieComponent(props: IMovieProps) {
    const movie = props.movie;
    const [visible, setVisible] = useState(false);
    const [fadedOut, setFadedOut] = useState(true);
    const observerThreshold = 0.3;

    // ### REF ###
    // Reference to itself in the DOM. so we can change the class.
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

    return (
        <Link
            to={`/movies/${movie.imdbID}`}
            className={`movie ${fadedOut ? "fade-in" : ""} ${
                visible ? "appear" : ""
            }`}
            ref={movieRef}
        >
            <div className="__poster">
                <img src={movie.Poster} alt={movie.Title} />
            </div>
        </Link>
    );
}
