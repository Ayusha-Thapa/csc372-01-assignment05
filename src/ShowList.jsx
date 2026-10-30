import ShowCard from "./ShowCard";

function ShowList({ shows, searchTerm, loading, error }) {
    if (searchTerm === "") {
        return <p>Please enter a show title or keyword.</p>;
    }

    if (loading) {
        return <p>Loading shows...</p>;
    }

    if (error !== "") {
        return <p>{error}</p>;
    }

    if (shows.length === 0) {
        return <p>No shows found. Try another search.</p>;
    }

    return (
        <>
            <p>
                Showing {shows.length} results for "{searchTerm}".
            </p>

            <div id="show-gallery">
                {shows.map((show) => (
                    <ShowCard key={show.id} show={show} />
                ))}
            </div>
        </>
    );
}

export default ShowList;