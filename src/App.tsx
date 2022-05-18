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

export default function App() {
    return (
        <>
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
        </>
    );
}
