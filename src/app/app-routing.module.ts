import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FavoritesComponent } from './components/favorites/favorites.component';
import { WeatherDetailsComponent } from './components/weather-details/weather-details.component';

const routes: Routes = [
  { path: 'favorites', component: FavoritesComponent },
  { path: 'weather-details', component: WeatherDetailsComponent },
  { path: '',   redirectTo: '/weather-details', pathMatch: 'full' }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
