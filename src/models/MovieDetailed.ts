import IMovieDetailed from "../interface/IMovieDetailed";

export default class MovieDetailed {
    // ### STANDARD ###
    Poster: string = "";
    Title: string = "";
    Type: string = "";
    Year: string = "";
    imdbID: string = "";
    Error: string = "";
    // ### DETAILS ###
    Director: string = "";
    Writer: string = "";
    Actors: string = "";
    Genre: string = "";
    Plot: string = "";
    Runtime: string = "";
    Metascore: string = "";
    Awards: string = "";
    Released: string = "";
    BoxOffice: string = "";
    Rated: string = "";

    constructor(movie: IMovieDetailed) {
        // ### STANDARD ###
        this.Poster = movie.Poster;
        this.Title = movie.Title;
        this.Type = movie.Type;
        this.Year = movie.Year;
        this.imdbID = movie.imdbID;
        this.Error = movie.Error;
        // ### DETAILS ###
        this.Director = movie.Director;
        this.Writer = movie.Writer;
        this.Actors = movie.Actors;
        this.Genre = movie.Genre;
        this.Plot = movie.Plot;
        this.Runtime = movie.Runtime;
        this.Metascore = movie.Metascore;
        this.Awards = movie.Awards;
        this.Released = movie.Released;
        this.BoxOffice = movie.BoxOffice;
        this.Rated = movie.Rated;
    }
}
