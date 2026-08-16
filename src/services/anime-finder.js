import { api } from "./api";

export async function findAnimeByScreenshot(file) {
  const formData = new FormData();
  formData.append("image", file);

  const response = await api.post("/api/anime-finder", formData);

  return response.data.data;
}
