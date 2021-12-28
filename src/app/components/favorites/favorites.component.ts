import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { StateStoreService } from 'src/app/shared/services/state-store.service';
import { WeatherHttpRequestsService } from 'src/app/shared/services/weather-http-request.service';
import { Favorite } from '../weather-app-model';


@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.css']
})


export class FavoritesComponent implements OnInit {
  favorites: Favorite[]=[]
  constructor(public appState:StateStoreService, private http:WeatherHttpRequestsService , private router:Router) { }

  ngOnInit(): void {
      
    this.favorites = this.appState.getFavorites()
    this.getWeather()
  }
  getWeather(){

    this.favorites.forEach((value)=>{
        this.http.getCurrentWeather(value.key).subscribe((res)=>{
          if(res){
            let fav =this.favorites.find(val=>val.key === value.key)
            if(fav){
              fav.currentWeather = res;
            }
          }
        })

    })
    

  }

  showForecast(e:Favorite){
    this.appState.setSelectedCountry(e.country)
    this.appState.setFieldState('/weather-details','searchField','')
    this.router.navigateByUrl('/weather-details')
  }

}
