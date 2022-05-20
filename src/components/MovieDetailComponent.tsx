import "../scss/components/MovieDetailComponent.scss";
import MovieDetailed from "../models/MovieDetailed";

interface IMovieProps {
    movie: MovieDetailed;
}

export default function MovieDetailComponent(props: IMovieProps) {
    console.table(props.movie);

    return (
        <div className="detailed-movie">
            <div
                className="__back"
                onClick={() => {
                    window.history.back();
                }}
            >
                <span>⇦</span>
            </div>
            <div className="__movie">
                <div className="__poster">
                    <img src={props.movie.Poster} alt={props.movie.Title} />
                </div>
            </div>
        </div>
    );
}
