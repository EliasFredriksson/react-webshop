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
import { useState } from "react";
import CartComponent from "./components/CartComponent";

import { AppContext, IAppContext } from "./contexts/AppContext";

// ####### CONTEXT #######

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

    function updateContext(updatedContext: {}): void {
        setContextData({ ...contextData, ...updatedContext });
    }

    return (
        <AppContext.Provider value={contextData}>
            <CartComponent extraClass="__mobile"></CartComponent>
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
