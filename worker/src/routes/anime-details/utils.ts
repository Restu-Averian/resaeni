const ANIME_DETAILS_DEFAULT_LIMIT = 24;
const ANIME_DETAILS_MAX_LIMIT = 50;
const ANIME_DETAILS_MONTHS: Record<string, string> = {
  Jan: "01",
  Feb: "02",
  Mar: "03",
  Apr: "04",
  May: "05",
  Jun: "06",
  Jul: "07",
  Aug: "08",
  Sep: "09",
  Oct: "10",
  Nov: "11",
  Dec: "12",
};

export const parseMalId = (value: string | undefined): number | null => {
  if (!value || !/^\d+$/.test(value)) {
    return null;
  }

  const id = Number(value);
  return Number.isSafeInteger(id) && id > 0 ? id : null;
};

export const parseEpisodeNumber = (
  value: string | undefined,
): number | null => {
  if (!value || !/^\d+$/.test(value)) {
    return null;
  }

  const episodeNumber = Number(value);
  return Number.isSafeInteger(episodeNumber) && episodeNumber > 0
    ? episodeNumber
    : null;
};

export const parsePagination = (
  pageValue: string | undefined,
  limitValue: string | undefined,
) => {
  let page = Number(pageValue);
  if (!Number.isSafeInteger(page) || page <= 0) page = 1;

  let limit = Number(limitValue);
  if (!Number.isSafeInteger(limit) || limit <= 0)
    limit = ANIME_DETAILS_DEFAULT_LIMIT;
  if (limit > ANIME_DETAILS_MAX_LIMIT) limit = ANIME_DETAILS_MAX_LIMIT;

  return {
    page,
    limit,
    offset: (page - 1) * limit,
  };
};

export const parseGenres = (value: unknown): string[] => {
  if (typeof value !== "string") {
    return [];
  }

  try {
    const parsed: unknown = JSON.parse(value);
    return Array.isArray(parsed)
      ? parsed.filter((genre): genre is string => typeof genre === "string")
      : [];
  } catch {
    return [];
  }
};

const parseAiredDate = (value: string | undefined): string | null => {
  if (!value) {
    return null;
  }

  const trimmedValue = value.trim();
  const isoDateMatch = trimmedValue.match(/^(\d{4})-(\d{2})-(\d{2})$/);
  if (isoDateMatch) {
    return new Date(`${trimmedValue}T00:00:00Z`).toISOString();
  }

  const match = trimmedValue.match(/^([A-Za-z]{3})\s+(\d{1,2}),\s+(\d{4})$/);
  if (!match) {
    return null;
  }

  const [, monthName, day, year] = match;
  const month = ANIME_DETAILS_MONTHS[monthName];
  if (!month) {
    return null;
  }

  return new Date(
    `${year}-${month}-${day.padStart(2, "0")}T00:00:00Z`,
  ).toISOString();
};

export const parseAired = (value: string | null, season: string | null) => {
  const [fromValue, toValue] = value?.split(" to ") ?? [];
  const airedFrom = parseAiredDate(fromValue);
  const airedTo = parseAiredDate(toValue);
  const seasonYear = season?.match(/\b(\d{4})\b/)?.[1];
  const year = airedFrom
    ? new Date(airedFrom).getUTCFullYear()
    : seasonYear
      ? Number(seasonYear)
      : null;

  return {
    aired_from: airedFrom,
    aired_to: airedTo,
    year,
  };
};

export const normalizeNullableEpisodeNumber = (value: unknown): number | null => {
  const episodeNumber = Number(value);
  return Number.isSafeInteger(episodeNumber) && episodeNumber > 0
    ? episodeNumber
    : null;
};
