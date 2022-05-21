import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GenreComponent } from './genre/genre.component';
import { LoginComponent } from './login/login.component';
import { MainSearchComponent } from './main-search/main-search.component';
import { MainComponent } from './main/main.component';
import { SinglemovieComponent } from './singlemovie/singlemovie.component';
import { SignupComponent } from './signup/signup.component';  
import { ProfileComponent } from './profile/profile.component';
import { MoviesComponent } from './movies/movies.component'
import { ArtistsComponent } from './artists/artists.component';
import { SingleactorComponent } from './singleactor/singleactor.component';
import { PeopleComponent } from './people/people.component';
import { HomepageComponent } from './homepage/homepage.component';


const routes: Routes = [
  {
    path: 'single-movie/:id-movie',
    component: SinglemovieComponent
  },
  {
    path: 'single-actor/:person-id',
    component: SingleactorComponent
  },
  {
    path: 'search-movie/:search-term',
    component: MainSearchComponent
  },
  {
    path: 'homepage',
    component: HomepageComponent
  },
  {
    path: 'movies',
    component: MoviesComponent
  },
  {
    path: 'artists',
    component: ArtistsComponent
  },
  {
    path: 'directors',
    component: PeopleComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'signup',
    component: SignupComponent
  },
  {
    path: '',
    component: MainComponent
  },
  {
    path: 'genres/:selected-genre',
    component: GenreComponent
  },
  {
    path: 'myaccount',
    component: ProfileComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
