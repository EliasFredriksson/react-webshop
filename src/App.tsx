// ### REACT ###
import { useState } from "react";
// ### ROUTER ###
import { Route, Routes } from "react-router-dom";
// ### PAGES ###
import Home from "./components/pages/Home";
import About from "./components/pages/About";
import NotFound from "./components/pages/NotFound";
import MovieSingle from "./components/pages/MovieSingle";
// ### CONTEXT ###
import { AppContext, IAppContext } from "./contexts/AppContext";
import Checkout from "./components/pages/Checkout";
import Layout from "./components/Layout";

export default function App() {
    const [contextData, setContextData] = useState<IAppContext>({
        searchHistory: "",
        pageHistory: 0,
        countHistory: 0,
        backFromSingleMovie: false,
        windowY: 0,
        cart: [],
        updateContext: updateContext,
    });

    function updateContext(updatedContext: IAppContext): void {
        setContextData({ ...updatedContext });
    }

    return (
        <AppContext.Provider value={contextData}>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<Home />}></Route>
                    <Route path="/about" element={<About />}></Route>
                    <Route path="/media/:id" element={<MovieSingle />}></Route>
                    <Route path="/cart" element={<Checkout />}></Route>
                    <Route path="*" element={<NotFound />} />
                </Route>
            </Routes>
        </AppContext.Provider>
    );
}
