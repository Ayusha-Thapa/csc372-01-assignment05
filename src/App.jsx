import { useState, useEffect } from "react";
import SearchForm from "./SearchForm";
import "./App.css";
import ShowList from "./ShowList";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ShowDetail from "./ShowDetail";

function App() {
  const [query, setQuery] = useState("The Vampire Diaries");
  const [searchTerm, setSearchTerm] = useState("The Vampire Diaries");
  const [shows, setShows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const controller = new AbortController();

    async function loadShows() {
      setShows([]);
      setError("");

      if (searchTerm === "") {
        setLoading(false);
        return;
      }

      setLoading(true);

      try {
        const response = await fetch(
          "https://api.tvmaze.com/search/shows?q="
          + encodeURIComponent(searchTerm),
          { signal: controller.signal }
        );

        if (response.status === 429) {
          throw new Error(
            "Too many requests. Please wait before trying again."
          );
        }

        if (!response.ok) {
          throw new Error("Unable to load shows. Please try again.");
        }

        const data = await response.json();

        setShows(data.slice(0, 10).map((match) => match.show));
        setLoading(false);
      } catch (error) {
        if (error.name !== "AbortError") {
          setError(error.message);
          setLoading(false);
        }
      }
    }

    loadShows();

    return () => controller.abort();
  }, [searchTerm]);

  function handleSearch() {
    setSearchTerm(query.trim());
  }

  return (
    <BrowserRouter>
      <header>
        <h1>TV Show Gallery</h1>
        <p>Find your favorite shows and discover something new!</p>
      </header>

      <main>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <section>
                  <h2>Search for a Show</h2>

                  <SearchForm
                    query={query}
                    onQueryChange={setQuery}
                    onSearch={handleSearch}
                  />
                </section>

                <section>
                  <h2>Search Results</h2>

                  <ShowList
                    shows={shows}
                    searchTerm={searchTerm}
                    loading={loading}
                    error={error}
                  />
                </section>
              </>
            }
          />

          <Route path="/shows/:id" element={<ShowDetail />} />
        </Routes>
      </main>

      <footer>
        <p>
          Show data provided by{" "}
          <a href="https://www.tvmaze.com/">TVmaze</a>.
        </p>
      </footer>
    </BrowserRouter>
  );
}

export default App;