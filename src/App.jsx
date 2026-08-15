import { Route, Routes } from "react-router";
import Layout from "./components/global/layout.jsx";
import AnimeDetailsPage from "./pages/AnimeDetailsPage.jsx";
import HomePage from "./pages/HomePage.jsx";
import NotFoundPage from "./pages/NotFoundPage.jsx";

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="/anime/:mal_id" element={<AnimeDetailsPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}
