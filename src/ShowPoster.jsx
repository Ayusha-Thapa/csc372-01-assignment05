import { useState } from "react";

function ShowPoster({ show }) {
    const [imageFailed, setImageFailed] = useState(false);

    if (!show.image || !show.image.medium || imageFailed) {
        return <p>Poster not available.</p>;
    }

    return (
        <img
            className="show-poster"
            src={show.image.medium}
            alt={"Poster for " + (show.name || "this show")}
            onError={() => setImageFailed(true)}
        />
    );
}

export default ShowPoster;