import { Movie } from "./movie";

export interface Page{
    "currentPage" : 1,
    "isLast" : true,
    "totalPages": 2,
    "currentPageItems" : Movie[]
  }