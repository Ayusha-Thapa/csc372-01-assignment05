import { useState, useEffect } from "react";

function CastList({ showId }) {
    const [cast, setCast] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const controller = new AbortController();

        async function loadCast() {
            setCast([]);
            setLoading(true);
            setError("");

            try {
                const response = await fetch(
                    "https://api.tvmaze.com/shows/" + showId + "/cast",
                    { signal: controller.signal }
                );

                if (response.status === 429) {
                    throw new Error(
                        "Too many requests. Please wait before trying again."
                    );
                }

                if (!response.ok) {
                    throw new Error("Unable to load cast. Please try again later.");
                }

                const data = await response.json();

                setCast(data.slice(0, 15));
                setLoading(false);
            } catch (error) {
                if (error.name !== "AbortError") {
                    setError(error.message);
                    setLoading(false);
                }
            }
        }

        loadCast();

        return () => controller.abort();
    }, [showId]);

    if (loading) {
        return <p>Loading cast...</p>;
    }

    if (error !== "") {
        return <p>{error}</p>;
    }

    if (cast.length === 0) {
        return <p>Cast not available.</p>;
    }

    return (
        <ul>
            {cast.map((member) => (
                <li key={member.person.id + "-" + member.character.id}>
                    {member.person.name || "Name not available"}
                    {" as "}
                    {member.character.name || "Character not available"}
                </li>
            ))}
        </ul>
    );
}

export default CastList;