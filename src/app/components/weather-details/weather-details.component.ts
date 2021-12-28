import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StateStoreService } from '../../shared/services/state-store.service';
import { WeatherHttpRequestsService } from '../../shared/services/weather-http-request.service';
import { Country, Temperature } from '../weather-app-model';

@Component({
  selector: 'app-weather-details',
  templateUrl: './weather-details.component.html',
  styleUrls: ['./weather-details.component.css']
})



export class WeatherDetailsComponent implements OnInit {
  subscriber: any;
  title: string = '';
  country: Country = {
    value:'215854',label:'Tel Aviv',isFavorite:false
  };
  isFavorite:boolean = false;
  dailyTemperatures: Temperature[] = []

  constructor(private http: WeatherHttpRequestsService, public appState:StateStoreService,private location:Location) {


      
   }

  ngOnInit(): void {
    this.subscriber =this.appState.forecastResultsEmitter.subscribe((res)=>{
      if(res.dailyTemperatures){
        this.dailyTemperatures = res.dailyTemperatures;
        this.title = res.title
        this.isFavorite = this.appState.isFavorite()
      }
    })


    const country = this.appState.getSelectedCountry()
    if(country.value){
      this.setPageState(country)
    }else{
      // page default
      this.setPageState(this.country)

    }
  }

  toggleFavorite(){
    this.isFavorite = this.appState.toggleFavorite()

  }

  setPageState(country:Country) {
    this.country = country;
    this.isFavorite = this.appState.isFavorite()
    this.http.getForecasts(country.value)
  }
  ngOnDestroy(){
    if(this.subscriber) this.subscriber.unsubscribe()
  }
  
}
