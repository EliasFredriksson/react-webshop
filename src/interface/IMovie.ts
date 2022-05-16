import ICategory from "./ICategory";

export default interface IMovie {
    id: number;
    name: string;
    description: string;
    price: number;
    year: number;
    added: string;
    productCategory: ICategory[];
    imageUrl: string;
}
