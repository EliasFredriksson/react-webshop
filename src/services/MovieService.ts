import axios from "axios";
import IMovie from "../interface/IMovie";
import IOmbdResponse from "../interface/IOmdb";

export default class MovieService {
    KEY = "4c377e85";
    API = `http://www.omdbapi.com/?apikey=${this.KEY}&`;

    public async getMovies(searchText: string): Promise<IMovie[]> {
        const response = await axios.get<IOmbdResponse>(
            this.API + `s=${searchText}`
        );
        // We use .data as it is a axiosResponse, and inside that is the IOmdbResponse.
        console.log(response.data);
        if (response.data.Response === "False") return [];
        return response.data.Search;
    }
    public async getMovieById(Id: string): Promise<IMovie[]> {
        const response = await axios.get<IOmbdResponse>(this.API + `i=${Id}`);
        return response.data.Search;
    }

    // public async getMoviesByName(name: string): Promise<IMovie[]> {
    //     const response: IMedieinstitutetRespose = await axios.get<IMovie[]>(
    //         this.API + `/search?searchText=${name}`
    //     );
    //     return response.data;
    // }

    // public async getMovieById(id: number): Promise<IMovie> {
    //     const response: IMedieinstitutetRespose = await axios.get<IMovie[]>(
    //         this.API + `/products/${id}`
    //     );
    //     return response.data[0];
    // }
}
