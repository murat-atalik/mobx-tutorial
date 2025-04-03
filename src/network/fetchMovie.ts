import axios from "axios";
import {
  DetailResponse,
  eOMDBType,
  SearchOptionsType,
  searchResponseType,
} from "./networkTypes";
import { removeUndefinedProperties } from "../utils";

const apiKey = process.env.REACT_APP_OMDB_API_KEY;

const baseUrl = "https://www.omdbapi.com/";

export const searchMovies = (
  options: SearchOptionsType
): Promise<searchResponseType> => {
  return new Promise(async (resolve, reject) => {
    try {
      const { searchTerm, page, type, year } = options;

      const params = removeUndefinedProperties({
        s: searchTerm,
        y: year === -1 ? undefined : year,
        page,
        type: type === eOMDBType.ALL ? undefined : type,
        apikey: apiKey,
      });

      const response = await axios.get(baseUrl, {
        params: params,
      });
      const data = response.data as searchResponseType;
      if (data.Error) {
        reject(new Error(data.Error));
      }
      resolve(data);
    } catch (error) {
      reject({
        Response: "False",
        Search: [],
        totalResults: "0",
      } as searchResponseType);
    }
  });
};

export const getMovie = (id: string): Promise<DetailResponse> => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await axios.get(baseUrl, {
        params: {
          i: id,
          plot: "full",
          apikey: apiKey,
        },
      });
      const data = response.data as DetailResponse;
      if (data.Error) {
        reject(new Error(data.Error));
      }
      resolve(data);
    } catch (error: any) {
      reject(new Error("Failed to fetch movie"));
    }
  });
};
