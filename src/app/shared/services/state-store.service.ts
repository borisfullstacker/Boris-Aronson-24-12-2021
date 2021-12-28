import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { Country, CurrentWeather, Favorite, Forecast } from 'src/app/components/weather-app-model';
import { ModalService } from './modal-service.service';

@Injectable({
  providedIn: 'root'
})
export class StateStoreService {
  loaderEmitter = new Subject<boolean>() 
  forecastResultsEmitter = new BehaviorSubject<any>({})
  searchResultsEmitter = new BehaviorSubject<any>([])
  countries: Country[] = []
  isFahrenheit:boolean = false
  forecast: Forecast = {
    dailyTemperatures: [],
    title: ''
  }
  favorites: Favorite[] = []
  country: Country = {
    value:'215854',label:'Tel Aviv',isFavorite:false
  } //default
  
  formFields: any = {}
  constructor(private modalService:ModalService) {

    const faves = localStorage.getItem('favorites')
    if(faves !== null){
      this.favorites = JSON.parse(faves)
    }

  }

  getFormState(module: any, fieldName: any) {
    return this.formFields[module + "-" + fieldName]

  }

  setFieldState(module: any, fieldName: any, payload: any) {
    //field name has to be unique;
    this.formFields[module + "-" + fieldName] = payload
  }

  setCountries(countries: Country[]) {
    this.countries = countries;
    this.searchResultsEmitter.next(countries)
  }

  setWeatherForecast(forecast: Forecast) {
    this.forecast.dailyTemperatures = forecast.dailyTemperatures;
    this.forecast.title = forecast.title;
    this.forecastResultsEmitter.next(forecast)

  }

  toggleFahrenheit(){
    this.isFahrenheit = !this.isFahrenheit;
  }

  toggleFavorite(): boolean {
    let favIndex = this.favorites.findIndex((val, index) => val.key === this.country.value)
    if (favIndex !== -1) {
      this.favorites.splice(favIndex, 1);
      this.modalService.toastSuccess('Removed from favorites')
      localStorage.setItem('favorites',JSON.stringify(this.favorites))

      return false
    } else {
      const obj: Favorite = {
        name: this.country.label,
        currentWeather: new CurrentWeather(),
        key: this.country.value,
        country:this.country,
        icon:''
      }
      this.modalService.toastSuccess('Added to favorites')

      this.favorites.push(obj);
      localStorage.setItem('favorites',JSON.stringify(this.favorites))
      return true
    }
  }
  getForecast(): Forecast {
    return this.forecast;
  }
  getFavorites(): Favorite[] {
    return this.favorites;
  }
  setSelectedCountry(country: Country) {
    this.country = country
  }

  getSelectedCountry(): Country {
    return this.country
  }

  getCountryById(id : string) : Favorite | undefined{
    return this.favorites.find((val)=>val.key === id)
  }

  isFavorite(country?: Country): boolean {
    const favorites = this.getFavorites();
    if (favorites.find((value) =>((country ? country.value : this.country.value)) === value.key)) {
      return true;
    } else {
      return false;
    }
  }


}
