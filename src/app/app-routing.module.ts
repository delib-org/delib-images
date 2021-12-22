import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

//pages
import { MainComponent } from './pages/main/main.component';
import { AppComponent } from './app.component';
import { CreateCompetitionComponent } from './pages/create-competition/create-competition.component';
import { CreateCompareComponent } from './pages/create-compare/create-compare.component'

const routes: Routes = [
  { path: '', component: MainComponent },
  { path: 'create-competition', component: CreateCompetitionComponent },
  { path: 'create-compare', component: CreateCompareComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
