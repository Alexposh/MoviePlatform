import { PageOfMovies } from "./pageOfMovies";

export interface HomepageCategory {

    category_name: string;
    movies_loaded_on_cache: PageOfMovies[];              
    page_displayed: number;
    number_of_movies_in_category: number;
    
}

