import { useState, useEffect } from "react";
import { cleanSummary, formatUpdated } from "./utils";
import { Link } from "react-router-dom";
import ShowPoster from "./ShowPoster";

function ShowCard({ show }) {
    const [cast, setCast] = useState([]);
    const [castLoading, setCastLoading] = useState(true);
    const [castError, setCastError] = useState("");

    useEffect(() => {
        const controller = new AbortController();

        async function loadCast() {
            setCast([]);
            setCastLoading(true);
            setCastError("");

            try {
                const response = await fetch(
                    "https://api.tvmaze.com/shows/" + show.id + "/cast",
                    { signal: controller.signal }
                );

                if (response.status === 429) {
                    throw new Error(
                        "Too many requests. Please wait before trying again."
                    );
                }

                if (!response.ok) {
                    throw new Error("Unable to load cast.");
                }

                const data = await response.json();

                setCast(data.slice(0, 4));
                setCastLoading(false);
            } catch (error) {
                if (error.name !== "AbortError") {
                    setCastError(error.message);
                    setCastLoading(false);
                }
            }
        }

        loadCast();

        return () => controller.abort();
    }, [show.id]);

    let genres = "Not available";

    if (show.genres && show.genres.length > 0) {
        genres = show.genres.join(", ");
    }

    let rating = "Not available";

    if (show.rating && show.rating.average != null) {
        rating = show.rating.average + "/10";
    }

    return (
        <article className="show-card">
            <h3>
                <Link to={"/shows/" + show.id}>
                    {show.name || "Title not available"}
                </Link>
            </h3>

            <ShowPoster show={show} />

            <p>{cleanSummary(show.summary)}</p>

            <p>Premiered: {show.premiered || "Not available"}</p>

            <p>Record updated: {formatUpdated(show.updated)}</p>

            <p>Genres: {genres}</p>

            <p>Average rating: {rating}</p>

            <h4>Main Cast</h4>

            {castLoading ? (
                <p>Loading cast...</p>
            ) : castError !== "" ? (
                <p>{castError}</p>
            ) : cast.length === 0 ? (
                <p>Cast not available.</p>
            ) : (
                <ul>
                    {cast.map((member) => (
                        <li key={member.person.id + "-" + member.character.id}>
                            {member.person.name || "Name not available"}
                        </li>
                    ))}
                </ul>
            )}

            <a href={"https://www.tvmaze.com/shows/" + show.id}>
                View show on TVmaze
            </a>
        </article>
    );
}

export default ShowCard;