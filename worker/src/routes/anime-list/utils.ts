import type { AnimeListOrder } from "./types";

const DEFAULT_LIMIT = 20;
const MAX_LIMIT = 50;

export const orderByMap: Record<AnimeListOrder, string> = {
  highest_rated: "rating DESC, title_en COLLATE NOCASE ASC",
  latest: "updated_at DESC",
  a_z: "title_en COLLATE NOCASE ASC",
  z_a: "title_en COLLATE NOCASE DESC",
};

export const parsePagination = (
  pageValue: string | undefined,
  limitValue: string | undefined,
) => {
  let page = Number(pageValue);
  if (!Number.isSafeInteger(page) || page <= 0) page = 1;

  let limit = Number(limitValue);
  if (!Number.isSafeInteger(limit) || limit <= 0) limit = DEFAULT_LIMIT;
  if (limit > MAX_LIMIT) limit = MAX_LIMIT;

  return {
    page,
    limit,
    offset: (page - 1) * limit,
  };
};

export const parseOrder = (value: string | undefined): AnimeListOrder => {
  const order = value?.trim() as AnimeListOrder | undefined;

  return order && order in orderByMap ? order : "highest_rated";
};

export const trimQuery = (value: string | undefined) => value?.trim() || "";
