import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { DataService } from './data.service';
import { HttpClientModule } from '@angular/common/http';

import { NgxPaginationModule } from 'ngx-pagination';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';
import { LoginFormComponent } from './login-form/login-form.component';
import { SearchComponent } from './search/search.component';
import { InsertComponent } from './insert/insert.component';
import { BrowseComponent } from './browse/browse.component';
import { UploadComponent } from './upload/upload.component';
import { GameComponent } from './game/game.component';

// Define the routes
const ROUTES = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'login',
    component: LoginFormComponent
  },
  {
    path: 'search',
    component: SearchComponent
  },
  {
    path: 'insert',
    component: InsertComponent    
  },
  {
    path: 'browse',
    component: BrowseComponent    
  },
  {
    path: 'upload',
    component: UploadComponent    
  },
  {
    path: 'game/:gid',
    component: GameComponent    
  }  
];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    LoginFormComponent,
    SearchComponent,
    InsertComponent,
    BrowseComponent,
    UploadComponent,
    GameComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(ROUTES),
    FormsModule,
    HttpModule,
    NgxPaginationModule,
    ReactiveFormsModule
  ],
  providers: [
    DataService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
