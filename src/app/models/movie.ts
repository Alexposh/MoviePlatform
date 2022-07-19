export interface Movie {
    movie_id: number,
    title: string;
    budget: number;
    homepage: string;
    overview: string;
    popularity: number;
    release_date: Date; 
    revenue: number;
    runtime: number;
    movie_status: string;
    tagline: string;
    vote_average: number;
    vote_count: number
}

// created -  page_of_movies{
    //     page_number: number                 
    //     movies_loaded_on_page: Movie[]
    // }

//     Category{
//         category_name: string,
//         movies_loaded_on_cache: page_of_movies[]                
//         page_displayed: number,
//         number_of_movies_in_category: number,
//     }


// //Homepage{
//     all_categories_loaded: Category[]
// }