export function formatTimestamp(seconds) {
  if (typeof seconds !== "number" || !Number.isFinite(seconds)) return null;

  const totalSeconds = Math.max(0, Math.floor(seconds));
  const hours = String(Math.floor(totalSeconds / 3600)).padStart(2, "0");
  const minutes = String(Math.floor((totalSeconds % 3600) / 60)).padStart(
    2,
    "0",
  );
  const remainingSeconds = String(totalSeconds % 60).padStart(2, "0");

  return `${hours}:${minutes}:${remainingSeconds}`;
}

export function formatPercentage(value) {
  if (typeof value !== "number" || !Number.isFinite(value)) return "0%";

  return `${Math.round(value * 100)}%`;
}

export function getAnimeFinderMatchTitle(match) {
  return (
    match?.catalog?.title_en ||
    match?.catalog?.title_romaji ||
    match?.title?.english ||
    match?.title?.romaji ||
    match?.title?.native ||
    "Unknown anime"
  );
}
