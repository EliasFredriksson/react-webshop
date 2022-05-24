import IMedia from "./IMedia";

export default interface IOmbdResponse {
    Search: IMedia[];
    Response: string;
    totalResults: string;
}
