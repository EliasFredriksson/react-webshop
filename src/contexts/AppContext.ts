import { createContext } from "react";
import Media from "../models/Media";

export interface IAppContext {
    searchHistory: string;
    pageHistory: number;
    countHistory: number;
    backFromSingleMovie: boolean;
    windowY: number;
    cart: Media[];
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
