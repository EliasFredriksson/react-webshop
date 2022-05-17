// ### COMPONENTS ###
import MovieBrowse from "../components/MovieBrowse";
import HeaderComponent from "../components/HeaderComponent";
import FooterComponent from "../components/FooterComponent";

export default function Home() {
    return (
        <>
            <HeaderComponent></HeaderComponent>
            <MovieBrowse></MovieBrowse>
            <FooterComponent></FooterComponent>
        </>
    );
}
