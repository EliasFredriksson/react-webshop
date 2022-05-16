import axios from "axios";
import IMedieinstitutetRespose from "../interface/IMedieinstitutetRespose";
import IMovie from "../interface/IMovie";

export default class MovieService {
    API = "https://medieinstitutet-wie-products.azurewebsites.net/api/products";

    public async getMovies(): Promise<IMovie[]> {
        const response: IMedieinstitutetRespose = await axios.get<IMovie[]>(
            this.API
        );
        return response.data;
    }
}
