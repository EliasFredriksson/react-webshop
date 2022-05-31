import { Outlet } from "react-router-dom";
// ### COMPONENTS ###
import CartIcon from "./CartIcon";
import Footer from "./Footer";
import Header from "./Header";
import Navigation from "./Navigation";
import NavigationDesktop from "./NavigationDesktop";

export default function Layout() {
    return (
        <>
            <CartIcon extraClass="__mobile"></CartIcon>
            <Header></Header>
            <NavigationDesktop></NavigationDesktop>
            <Navigation></Navigation>
            <Outlet />
            <Footer></Footer>
        </>
    );
}
