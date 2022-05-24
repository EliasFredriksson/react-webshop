// ### ROUTER ###
import { Route, Routes } from "react-router-dom";
// ### PAGES ###
import Home from "./pages/Home";
import SingleMovie from "./pages/SingleMovie";
import About from "./pages/About";
import NotFound from "./pages/NotFound";
// ### COMPONENTS ###
import Navigation from "./components/Navigation";
import HeaderComponent from "./components/HeaderComponent";
import FooterComponent from "./components/FooterComponent";
import NavigationDesktop from "./components/NavigationDesktop";
import { createContext } from "react";
import CartComponent from "./components/CartComponent";
import Movie from "./models/Movie";

// ####### CONTEXT #######
interface IAppContext {
    searchHistory: string;
    pageHistory: number;
    countHistory: number;
    backFromSingleMovie: boolean;
    windowY: number;
    cart: Movie[];
}
const ContextData: IAppContext = {
    searchHistory: "",
    pageHistory: 1,
    countHistory: 0,
    backFromSingleMovie: false,
    windowY: 0,
    cart: [],
};
export const AppContext = createContext<IAppContext>(ContextData);
// ########################

export default function App() {
    return (
        <AppContext.Provider value={ContextData}>
            <CartComponent></CartComponent>
            <HeaderComponent></HeaderComponent>
            <NavigationDesktop></NavigationDesktop>
            <Navigation></Navigation>
            <Routes>
                <Route path="/" element={<Home />}></Route>
                <Route path="/about" element={<About />}></Route>
                <Route path="/movies/:id" element={<SingleMovie />}></Route>
                <Route path="*" element={<NotFound />} />
            </Routes>
            <FooterComponent></FooterComponent>
        </AppContext.Provider>
    );
}
