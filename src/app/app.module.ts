import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { MainComponent } from './main/main.component';
import { FooterComponent } from './footer/footer.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { SinglemovieComponent } from './singlemovie/singlemovie.component';
import { NavigationComponent } from './navigation/navigation.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MainSearchComponent } from './main-search/main-search.component';
import { GenreComponent } from './genre/genre.component';
import { PaginationComponent } from './pagination/pagination.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { ProfileComponent } from './profile/profile.component';
import { MoviesComponent } from './movies/movies.component';
import { ArtistsComponent } from './artists/artists.component';
import { SingleactorComponent } from './singleactor/singleactor.component';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { PeopleComponent } from './people/people.component';
import { NewmoviesComponent } from './newmovies/newmovies.component';
import { HomepageComponent } from './homepage/homepage.component';
import { UnicodeFriendlyPipe } from './unicode-friendly.pipe';
import { CorrectionAreaComponent } from './correction-area/correction-area.component';
import { MovieSinopsysDialogComponent } from './movie-sinopsys-dialog/movie-sinopsys-dialog.component';
import { DirectorsComponent } from './directors/directors.component';
import {MatDialogModule} from '@angular/material/dialog';
import { ShortenTitlePipe } from './shorten-title.pipe';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    MainComponent,
    FooterComponent,
    SinglemovieComponent,
    NavigationComponent,
    MainSearchComponent,
    GenreComponent,
    PaginationComponent,
    LoginComponent,
    SignupComponent,
    ProfileComponent,
    MoviesComponent,
    ArtistsComponent,
    SingleactorComponent,
    PeopleComponent,
    NewmoviesComponent,
    HomepageComponent,
    UnicodeFriendlyPipe,
    CorrectionAreaComponent,
    MovieSinopsysDialogComponent,
    DirectorsComponent,
    ShortenTitlePipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatSelectModule,
    MatCardModule,
    MatGridListModule,
    FormsModule,
    MatSnackBarModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    MatInputModule,
    MatDialogModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
