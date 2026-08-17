import { api } from "./api";

export async function getAnimeDetails(malId) {
  const response = await api.get(`/api/anime/${malId}`);
  return response.data?.data;
}

export async function getAnimeDetailsEpisodes(malId, params) {
  const response = await api.get(`/api/anime/${malId}/episodes`, {
    params,
  });
  return response.data?.data;
}

export async function getAnimeDetailsCharacters(malId, params) {
  const response = await api.get(`/api/anime/${malId}/characters`, {
    params,
  });
  return response.data?.data;
}
