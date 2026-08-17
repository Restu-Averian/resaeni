import { Box } from "@chakra-ui/react";
import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router";
import Layout from "./components/global/layout";
import HomePage from "./pages/HomePage.jsx";

const AnimeListPage = lazy(() => import("./pages/AnimeListPage.jsx"));
const AnimeDetailsPage = lazy(() => import("./pages/AnimeDetailsPage.jsx"));
const AnimeStreamingPage = lazy(() => import("./pages/AnimeStreamingPage.jsx"));
const NotFoundPage = lazy(() => import("./pages/NotFoundPage.jsx"));

export default function App() {
  return (
    <Suspense fallback={<Box minH="100vh" bg="bg.canvas" />}>
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
    </Suspense>
  );
}
