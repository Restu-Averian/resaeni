import { ListFilter, PlaySquare, Tags } from "lucide-react";

export const FILTER_OPTIONS = {
  genre: [
    "Any",
    "Action",
    "Adventure",
    "Comedy",
    "Drama",
    "Fantasy",
    "Mystery",
    "Romance",
    "Sci-Fi",
    "Slice of Life",
    "Sports",
    "Supernatural",
  ],
  type: ["Any", "TV", "Movie", "OVA", "ONA", "Special"],
  order: ["Newest", "Highest Rated", "Title A-Z", "Title Z-A"],
};

export const DEFAULT_FILTERS = {
  genre: "Any",
  type: "Any",
  order: "Newest",
};

export const ORDER_VALUE_MAP = {
  Newest: "latest",
  "Highest Rated": "highest_rated",
  "Title A-Z": "a_z",
  "Title Z-A": "z_a",
};

export const FILTERS_CONFIG = [
  { name: "genre", label: "Genre", icon: Tags },
  { name: "type", label: "Format", icon: PlaySquare },
  { name: "order", label: "Order", icon: ListFilter },
];

export const CHIP_FILTERS = ["genre", "type"];

export const LIMIT = 8;
