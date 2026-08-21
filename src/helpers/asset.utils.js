import { BASE_ASSETS_URL } from "../constants/assets.constants.js";

/**
 * Membentuk URL lengkap untuk asset media dari path relatif atau URL yang sudah valid.
 *
 * @param {string} [path] - Path asset relatif (misal: "/lookism/thumbnail/eps1.webp") atau URL absolut.
 * @returns {string} URL asset lengkap atau string kosong jika path tidak valid.
 */
export const getAssetUrl = (path) => {
  if (!path || typeof path !== "string") return "";

  if (
    path.startsWith("http://") ||
    path.startsWith("https://") ||
    path.startsWith("//") ||
    path.startsWith("data:") ||
    path.startsWith("blob:")
  ) {
    return path;
  }

  const base = (BASE_ASSETS_URL || "https://assets.resaeni.cc").replace(
    /\/+$/,
    "",
  );
  const cleanPath = path.startsWith("/") ? path : `/${path}`;

  return `${base}${cleanPath}`;
};
