import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainComponent } from './pages/main/main.component';
import { CreateCompetitionComponent } from './pages/create-competition/create-competition.component';
import { CreateCompareComponent } from './pages/create-compare/create-compare.component';
import { AddImageComponent } from './pages/create-compare/add-image/add-image.component';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    CreateCompetitionComponent,
    CreateCompareComponent,
    AddImageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
