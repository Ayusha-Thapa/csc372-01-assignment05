function SearchForm({ query, onQueryChange, onSearch }) {
    function handleSubmit(event) {
        event.preventDefault();
        onSearch();
    }

    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor="search-input">Show title or keyword:</label>

            <input
                type="search"
                id="search-input"
                value={query}
                onChange={(event) => onQueryChange(event.target.value)}
                placeholder="Type a show title or keyword..."
            />

            <button type="submit">Search</button>
        </form>
    );
}

export default SearchForm;