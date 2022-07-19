import { Movie } from "./movie";


export interface PageOfMovies {
    page_number: number;              
    movies_loaded_on_page: Movie[];
}