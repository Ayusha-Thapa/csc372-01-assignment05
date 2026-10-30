// Remove HTML tags and shorten the summary.
export function cleanSummary(summary) {
    if (!summary) {
        return "Summary not available.";
    }

    let text = "";
    let insideTag = false;

    for (let i = 0; i < summary.length; i++) {
        if (summary[i] === "<") {
            insideTag = true;
        } else if (summary[i] === ">") {
            insideTag = false;
            text += " ";
        } else if (!insideTag) {
            text += summary[i];
        }
    }

    text = text.trim();

    if (text === "") {
        return "Summary not available.";
    }

    if (text.length > 250) {
        return text.slice(0, 247).trim() + "...";
    }

    return text;
}

// Convert the API's timestamp into a readable date and time.
export function formatUpdated(updated) {
    if (typeof updated !== "number") {
        return "Not available";
    }

    return new Date(updated * 1000).toLocaleString();
}