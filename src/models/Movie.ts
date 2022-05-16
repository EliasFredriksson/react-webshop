import IMovie from "../interface/IMovie";

export default class Movie {
    Poster: string = "Missing poster";
    Title: string = "Missing title";
    Type: string = "Missing type";
    Year: string = "Missing year";
    imdbID: string = "Missing imdbID";

    constructor(movie: IMovie) {
        this.Poster = movie.Poster;
        this.Title = movie.Title;
        this.Type = movie.Type;
        this.Year = movie.Year;
        this.imdbID = movie.imdbID;
    }
}
