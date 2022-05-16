import ICategory from "../interface/ICategory";
import IMovie from "../interface/IMovie";

export default class Movie {
    id: number = -1;
    name: string = "Missing name";
    description: string = "Missing description";
    price: number = -1;
    year: number = -1;
    added: string = "Missing added date";
    productCategory: ICategory[] = [];
    imageUrl: string = "Missing image.";
    constructor(movie: IMovie) {
        this.id = movie.id;
        this.name = movie.name;
        this.description = movie.description;
        this.price = movie.price;
        this.year = movie.year;
        this.added = movie.added;
        this.productCategory = movie.productCategory;
        this.imageUrl = movie.imageUrl;
    }
}
