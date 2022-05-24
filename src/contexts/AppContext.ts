import { createContext } from "react";
import Movie from "../models/Movie";

export interface IAppContext {
    searchHistory: string;
    pageHistory: number;
    countHistory: number;
    backFromSingleMovie: boolean;
    windowY: number;
    cart: Movie[];
    updateContext(updatedContext: IAppContext): void;
}

export const AppContext = createContext<IAppContext>({
    searchHistory: "",
    pageHistory: 0,
    countHistory: 0,
    backFromSingleMovie: false,
    windowY: 0,
    cart: [],
    updateContext: () => {},
});
