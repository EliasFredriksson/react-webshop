import { useContext } from "react";
import "../scss/components/Checkout.scss";
// ### CONTEXT ###
import { AppContext } from "../contexts/AppContext";
// ### COMPONENTS ###
import MediaCard from "../components/MediaCard";
// ### MODELS ###
import Media from "../models/Media";

interface CartEntry {
    quantity: number;
    media: Media;
}

export default function Checkout() {
    const context = useContext(AppContext);

    let html = <div className="__loader"></div>;

    let cart: CartEntry[] = [];
    let movieIds: string[] = [];

    context.cart.forEach((m: Media) => {
        if (!movieIds.includes(m.imdbID)) {
            cart.push({
                quantity: 1,
                media: m,
            });
            movieIds.push(m.imdbID);
        } else {
            const entry = cart.find((entry) => {
                return entry.media.imdbID === m.imdbID;
            });
            if (entry) entry.quantity++;
        }
    });

    if (context.cart.length <= 0) {
        html = (
            <>
                <h1 className="__title">Cart</h1>
                <h2 className="__empty">Your cart is empty...</h2>
            </>
        );
    } else {
        html = (
            <>
                <h1 className="__title">Cart</h1>
                <div className="__cart">
                    {cart.map((entry: CartEntry) => (
                        <div className="__entry" key={entry.media.imdbID}>
                            <div className="__information">
                                <p>Quantity: {entry.quantity}</p>
                                <p>Price: {entry.media.Price}$</p>
                                <button>+</button>
                                <button>-</button>
                            </div>
                            <MediaCard media={entry.media}></MediaCard>
                        </div>
                    ))}
                </div>
            </>
        );
    }

    return <main className="checkout">{html}</main>;
}
