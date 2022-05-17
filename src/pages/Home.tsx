// ### COMPONENTS ###
import MovieBrowse from "../components/MovieBrowse";
import HeaderComponent from "../components/HeaderComponent";
import FooterComponent from "../components/FooterComponent";
import NavigationDesktop from "../components/NavigationDesktop";

export default function Home() {
    return (
        <>
            <HeaderComponent></HeaderComponent>
            <NavigationDesktop></NavigationDesktop>
            <MovieBrowse></MovieBrowse>
            <FooterComponent></FooterComponent>
        </>
    );
}
