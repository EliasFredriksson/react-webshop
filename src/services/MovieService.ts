import axios from "axios";
import IMedieinstitutetRespose from "../interface/IMedieinstitutetRespose";
import IMovie from "../interface/IMovie";

export default class MovieService {
    API = "https://medieinstitutet-wie-products.azurewebsites.net/api";

    public async getMovies(): Promise<IMovie[]> {
        const response: IMedieinstitutetRespose = await axios.get<IMovie[]>(
            this.API + "/products"
        );
        return response.data;
    }

    public async getMoviesByName(name: string): Promise<IMovie[]> {
        const response: IMedieinstitutetRespose = await axios.get<IMovie[]>(
            this.API + `/search?searchText=${name}`
        );
        return response.data;
    }

    public async getMovieById(id: number): Promise<IMovie> {
        const response: IMedieinstitutetRespose = await axios.get<IMovie[]>(
            this.API + `/products/${id}`
        );
        return response.data[0];
    }
}
