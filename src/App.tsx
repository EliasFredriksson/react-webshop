import Home from "./pages/Home";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import SingleMovie from "./pages/SingleMovie";
import About from "./pages/About";
import NotFound from "./pages/NotFound";
import Header from "./components/Header";
import Navigation from "./components/Navigation";
import Footer from "./components/Footer";

export default function App() {
    return (
        <BrowserRouter>
            <Header></Header>
            <Navigation></Navigation>
            <Routes>
                <Route path="/" element={<Home />}></Route>
                <Route path="/about" element={<About />}></Route>
                <Route path="/movies/:id" element={<SingleMovie />}></Route>
                <Route path="*" element={<NotFound />} />
            </Routes>
            <Footer></Footer>
        </BrowserRouter>
    );
}
