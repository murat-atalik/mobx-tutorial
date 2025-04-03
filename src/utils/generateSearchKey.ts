import { SearchOptionsType } from "../network";

export const generateSearchKey = (options: SearchOptionsType) => {
  const { searchTerm, year, type, page } = options;

  return `${searchTerm}${year ? `_${year}` : ""}${type ? `_${type}` : ""}${
    page !== undefined ? `_${page}` : ""
  }`;
};
