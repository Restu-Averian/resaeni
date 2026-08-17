import { Route, Routes } from "react-router";
import AnimeDetailsPage from "./pages/AnimeDetailsPage.jsx";
import AnimeListPage from "./pages/AnimeListPage.jsx";
import AnimeStreamingPage from "./pages/AnimeStreamingPage.jsx";
import HomePage from "./pages/HomePage.jsx";
import NotFoundPage from "./pages/NotFoundPage.jsx";
import Layout from "./components/global/layout";

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<HomePage />} />

        <Route path="/anime" element={<AnimeListPage />} />

        <Route path="/anime/:mal_id" element={<AnimeDetailsPage />} />

        <Route
          path="/anime/:mal_id/episode/:episode_number"
          element={<AnimeStreamingPage />}
        />

        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}
