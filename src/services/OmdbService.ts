// ### AXIOS ###
import axios from "axios";
// ### INTERFACES ###
import IOmbdResponse from "../interface/IOmdbResponse";
import IMediaDetailed from "../interface/IMediaDetailed";

export default class OmdbService {
    KEY = "4c377e85";
    API = `http://www.omdbapi.com/?apikey=${this.KEY}&`;

    public async getMovies(
        searchText: string,
        page: number = 1
    ): Promise<IOmbdResponse> {
        const response = await axios.get<IOmbdResponse>(
            this.API + `s=${searchText}&page=${page}`
        );
        // We use .data as it is a axiosResponse, and inside that is the IOmdbResponse.
        return response.data;
    }

    public async getMovieById(Id: string): Promise<IMediaDetailed> {
        const response = await axios.get<IMediaDetailed>(this.API + `i=${Id}`);
        return response.data;
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
