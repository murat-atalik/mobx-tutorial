# Mobx Demo

A Single Page Application (SPA) developed using React for listing and viewing details of movies. The application uses the OMDb API to fetch movie data.

## Features

- **Movie Listing**: Displays movies in a grid/table format with columns for name, release date, and IMDb ID.
- **Search**: Search movies by name, with "lord" as the default search.
- **Pagination**: Displays 10 movies per page.
- **Year Filter**: Filter movies by release year.
- **Type Filter**: Filter by movies, TV series, or TV episodes.
- **Details View**: Redirects to a detailed page for the selected movie, displaying:
  - Poster
  - Title
  - Duration
  - Genre
  - Director
  - Cast
  - IMDb Rating
- **Responsive Design**: Optimized for different screen sizes.

## Tech Stack

- **Frontend Framework**: React (with TypeScript)
- **State Management**: Redux Toolkit
- **Styling**: SASS/SCSS
- **HTTP Client**: Axios
- **Routing**: React Router
- **Icons**: React Icons

## Installation

Follow the steps below to set up the project locally:

1. **Clone the repository:**

   ```bash
   git clone https://github.com/murat-atalik/mobx-demo.git
   cd mobx-demo
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Add an OMDb API Key:**

   - Visit [OMDb API](https://www.omdbapi.com/apikey.aspx) and generate an API key.
   - Create a `.env` file in the project root and add the following line:
     ```bash
     REACT_APP_OMDB_API_KEY=your_api_key_here
     ```

4. **Start the development server:**

   ```bash
   npm start
   ```

5. Open your browser and navigate to `http://localhost:3000`.

## Scripts

- **Start**: Runs the app in development mode.
  ```bash
  npm start
  ```
- **Build**: Builds the app for production.
  ```bash
  npm run build
  ```
- **Test**: Launches the test runner.
  ```bash
  npm test
  ```
- **Eject**: Ejects the app configuration. (Use with caution!)
  ```bash
  npm run eject
  ```

## File Structure

```
mobx-demo/
├── public/             # Public assets
├── src/
│   ├── components/     # Reusable components
│   ├── pages/          # Page components
│   ├── store/          # Redux store configuration
│   ├── utils/          # Utility functions
│   ├── App.tsx         # Main app component
│   └── index.tsx       # Entry point
├── .env                # Environment variables
├── package.json        # Project dependencies and scripts
└── README.md           # Project documentation
```

## Dependencies

**Key Libraries:**

- `react`: Frontend framework
- `@reduxjs/toolkit`: State management
- `axios`: API requests
- `sass`: CSS preprocessor
- `react-router-dom`: Routing
- `react-icons`: Icons

## DevDependencies

- TypeScript typings for React, Redux, and other libraries
- Babel plugins for modern JavaScript support

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

Feel free to contribute by submitting issues or pull requests! 😊
