import IMedia from "../interface/IMedia";

export default class Media {
    Poster: string = "Missing poster";
    Title: string = "Missing title";
    Type: string = "Missing type";
    Year: string = "Missing year";
    imdbID: string = "Missing imdbID";
    Price: number = 30;

    constructor(movie: IMedia) {
        this.Poster = movie.Poster;
        this.Title = movie.Title;
        this.Type = movie.Type;
        this.Year = movie.Year;
        this.imdbID = movie.imdbID;
    }
}
