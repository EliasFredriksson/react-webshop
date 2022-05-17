// ### ROUTER ###
import { BrowserRouter, Route, Routes } from "react-router-dom";
// ### PAGES ###
import Home from "./pages/Home";
import SingleMovie from "./pages/SingleMovie";
import About from "./pages/About";
import NotFound from "./pages/NotFound";
// ### COMPONENTS ###
import Navigation from "./components/Navigation";

export default function App() {
    return (
        <BrowserRouter>
            <Navigation></Navigation>
            <Routes>
                <Route path="/" element={<Home />}></Route>
                <Route path="/about" element={<About />}></Route>
                <Route path="/movies/:id" element={<SingleMovie />}></Route>
                <Route path="*" element={<NotFound />} />
            </Routes>
        </BrowserRouter>
    );
}
