import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GenreComponent } from './genre/genre.component';
import { LoginComponent } from './login/login.component';
import { MainSearchComponent } from './main-search/main-search.component';
import { MainComponent } from './main/main.component';
import { SinglemovieComponent } from './singlemovie/singlemovie.component';
import { SignupComponent } from './signup/signup.component';  
import { ProfileComponent } from './profile/profile.component';


const routes: Routes = [
  {
    path: 'single-movie/:id-movie',
    component: SinglemovieComponent
  },
  {
    path: 'search-movie/:search-term',
    component: MainSearchComponent
  },
  {
    path: 'main',
    component: MainComponent
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
