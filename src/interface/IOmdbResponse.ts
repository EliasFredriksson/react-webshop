import IMovie from "./IMovie";

export default interface IOmbdResponse {
    Search: IMovie[];
    Response: string;
    totalResults: string;
}
