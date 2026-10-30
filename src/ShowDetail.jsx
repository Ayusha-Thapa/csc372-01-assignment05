import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { cleanSummary, formatUpdated } from "./utils";
import CastList from "./CastList";
import ShowPoster from "./ShowPoster";

function ShowDetail() {
    const { id } = useParams();

    const [show, setShow] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const controller = new AbortController();

        async function loadShow() {
            setShow(null);
            setLoading(true);
            setError("");

            try {
                const response = await fetch(
                    "https://api.tvmaze.com/shows/" + encodeURIComponent(id),
                    { signal: controller.signal }
                );

                if (response.status === 429) {
                    throw new Error(
                        "Too many requests. Please wait before trying again."
                    );
                }

                if (response.status === 404) {
                    throw new Error("Show not found. Please try another show.");
                }

                if (!response.ok) {
                    throw new Error("Unable to load this show. Please try again.");
                }

                const data = await response.json();

                setShow(data);
                setLoading(false);
            } catch (error) {
                if (error.name !== "AbortError") {
                    setError(error.message);
                    setLoading(false);
                }
            }
        }

        loadShow();

        return () => controller.abort();
    }, [id]);

    if (loading) {
        return (
            <section>
                <p>Loading show...</p>
                <Link to="/">Back to gallery</Link>
            </section>
        );
    }

    if (error !== "") {
        return (
            <section>
                <p>{error}</p>
                <Link to="/">Back to gallery</Link>
            </section>
        );
    }

    let genres = "Not available";

    if (show.genres && show.genres.length > 0) {
        genres = show.genres.join(", ");
    }

    let rating = "Not available";

    if (show.rating && show.rating.average != null) {
        rating = show.rating.average + "/10";
    }

    let channel = "Not available";

    if (show.network && show.network.name) {
        channel = show.network.name;
    } else if (show.webChannel && show.webChannel.name) {
        channel = show.webChannel.name;
    }

    return (
        <section>
            <Link to="/">Back to gallery</Link>

            <h2>{show.name || "Title not available"}</h2>

            <ShowPoster show={show} />

            <p>{cleanSummary(show.summary)}</p>

            <p>Premiered: {show.premiered || "Not available"}</p>

            <p>Record updated: {formatUpdated(show.updated)}</p>

            <p>Genres: {genres}</p>

            <p>Average rating: {rating}</p>

            <p>Status: {show.status || "Not available"}</p>

            <p>Network or streaming channel: {channel}</p>

            <h3>Main Cast</h3>

            <CastList showId={show.id} />

            <a href={"https://www.tvmaze.com/shows/" + show.id}>
                View show on TVmaze
            </a>
        </section>
    );
}

export default ShowDetail;