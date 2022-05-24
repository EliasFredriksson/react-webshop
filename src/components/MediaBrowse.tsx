import "../scss/components/MediaBrowse.scss";

// ### MEDIA ###
import Media from "../models/Media";

// ### COMPONENTS ###
import MediaCard from "./MediaCard";

interface IMediaBrowseProps {
    media: Media[];
}

export default function MovieBrowse(props: IMediaBrowseProps) {
    return (
        <div className="movies-container">
            {props.media.map((movie: Media) => (
                <MediaCard media={movie} key={movie.imdbID}></MediaCard>
            ))}
        </div>
    );
}
