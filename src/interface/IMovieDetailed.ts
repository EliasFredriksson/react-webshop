export default interface IMovieDetailed {
    // ### STANDARD ###
    Poster: string;
    Title: string;
    Type: string;
    Year: string;
    imdbID: string;
    Error: string;

    // ### DETAILS ###
    Director: string;
    Writer: string;
    Actors: string;
    Genre: string;
    Plot: string;
    Runtime: string;
    Metascore: string;
    Awards: string;
    Released: string;
    BoxOffice: string;
    Rated: string;
}
