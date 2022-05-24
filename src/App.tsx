// ### REACT ###
import { useState } from "react";
// ### ROUTER ###
import { Route, Routes } from "react-router-dom";
// ### PAGES ###
import Home from "./pages/Home";
import About from "./pages/About";
import NotFound from "./pages/NotFound";
import MovieSingle from "./pages/MovieSingle";
// ### COMPONENTS ###
import Navigation from "./components/Navigation";
import NavigationDesktop from "./components/NavigationDesktop";
import Footer from "./components/Footer";
import Header from "./components/Header";
import CartIcon from "./components/CartIcon";
// ### CONTEXT ###
import { AppContext, IAppContext } from "./contexts/AppContext";

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
            <CartIcon extraClass="__mobile"></CartIcon>
            <Header></Header>
            <NavigationDesktop></NavigationDesktop>
            <Navigation></Navigation>
            <Routes>
                <Route path="/" element={<Home />}></Route>
                <Route path="/about" element={<About />}></Route>
                <Route path="/movies/:id" element={<MovieSingle />}></Route>
                <Route path="*" element={<NotFound />} />
            </Routes>
            <Footer></Footer>
        </AppContext.Provider>
    );
}
