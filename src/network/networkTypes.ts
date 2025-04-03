export enum eOMDBType {
  ALL = "all",
  MOVIE = "movie",
  SERIES = "series",
  EPISODE = "episode",
}
export type searchResponseType = {
  Search: SearchItemType[];
  totalResults: string;
  Response: string;
  Error?: string;
};

export type SearchItemType = {
  Title: string;
  Year: string;
  imdbID: string;
  Type: eOMDBType;
  Poster: string;
};

export type PartialDetailResponse = {
  Rated: string;
  Released: string;
  Runtime: string;
  Genre: string;
  Director: string;
  Writer: string;
  Actors: string;
  Plot: string;
  Language: string;
  Country: string;
  Awards: string;
  Ratings: Rating[];
  Metascore: string;
  imdbRating: string;
  imdbVotes: string;
  DVD: string;
  BoxOffice: string;
  Production: string;
  Website: string;
  Response: string;
  Error?: string;
};

export type DetailResponse = SearchItemType & PartialDetailResponse;

export type Rating = {
  Source: string;
  Value: string;
};
export type SearchOptionsType = {
  searchTerm: string;
  year?: number;
  type?: eOMDBType;
  page?: number;
};
