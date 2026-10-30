# Assignment 5 — React

**Name:** Ayusha Thapa  
**Course:** CSC 372-01

This project rebuilds my previous TV show gallery using React and Vite. Users can search for shows. Additionally cicking a show’s name opens a detail page with more information.

## How to Run

Run these commands inside the project folder:

```bash
npm install
npm run dev
```

Then open the local link shown in the terminal.

## Required React Concepts

| Concept | Where I used it |
|---|---|
| 1. Components and props | App.jsx, SearchForm.jsx, ShowList.jsx, ShowCard.jsx, ShowDetail.jsx, CastList.jsx, and ShowPoster.jsx split the page into smaller parts and share data through props. |
| 2. Lists and keys | ShowList.jsx uses map() to display shows with show IDs as keys. ShowCard.jsx and CastList.jsx display cast members using person and character IDs as keys. |
| 3. Conditional rendering | ShowList.jsx shows different messages for loading, errors, empty searches, and no results. ShowPoster.jsx shows a message when a poster is unavailable. |
| 4. Controlled form | SearchForm.jsx uses value and onChange for the input, and onSubmit with preventDefault() to submit without reloading. |
| 5. State | App.jsx uses useState to store the search input, submitted term, results, loading state, and error message. |
| 6. Effects and fetch | App.jsx, ShowCard.jsx, ShowDetail.jsx, and CastList.jsx use useEffect to fetch data and check response.ok before reading JSON. |
| 7. Lifted state | The search state is in App.jsx and is shared with SearchForm.jsx and ShowList.jsx. ShowList.jsx displays the result count and search term. |
| 8. Routing | App.jsx has the gallery and detail routes. ShowCard.jsx uses Link, and ShowDetail.jsx uses useParams to read the show ID and Link to return. |

## Reflection

React helped me organize my code into smaller components. In my previous assignment, I had to create each HTML element and update its text. With React, I used JSX to show what should appear on the page. When the search results change, React updates the page for me. This made it easier to reuse the same card layout for different shows.

I kept the search state in App because both the search form and results list need that information. Each ShowCard stores its own cast information because it makes a separate request. ShowDetail reads the show ID from the URL and loads that show. This means the detail page still works when someone refreshes it or opens its link directly.

Additionally, I used AI tools to explain React concepts, troubleshoot Git issues, and revise my README.