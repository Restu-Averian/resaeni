export const FEATURED_ANIME_ID = "53149";

export const TONIGHTS_PICK_IDS = ["57658", "55825", "60058", "56009"] as const;

export const parseGenres = (value: unknown): string[] => {
  if (typeof value !== "string") {
    return [];
  }

  try {
    const parsed: unknown = JSON.parse(value);

    if (!Array.isArray(parsed)) {
      return [];
    }

    return parsed.filter((genre): genre is string => typeof genre === "string");
  } catch {
    return [];
  }
};
