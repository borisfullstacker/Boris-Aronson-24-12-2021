import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { debounce, debounceTime, map } from 'rxjs/operators';
import { Temperature } from 'src/app/components/weather-app-model';
import { StateStoreService } from './state-store.service';
@Injectable({
  providedIn: 'root'
})
export class WeatherHttpRequestsService {
  baseUrl: string = 'https://dataservice.accuweather.com/'
  params = new HttpParams()
    .set('apikey', 'Nv5x5cP2gCVd8I6yPk8OKJCRPQLYefGK')
  subject = new Subject()

  constructor(private http: HttpClient, private appState: StateStoreService) {

  }
  getForecasts(location: string) {

    this.http.get(this.baseUrl+ 'forecasts/v1/daily/5day/'+location, {params: this.params})
    .pipe(map((res: any) => {
        let obj = {
          dailyTemperatures: res.DailyForecasts.map((val: any) => {
            return {
            date: val.Date,
            val: val.Temperature.Maximum.Value,
            unit: val.Temperature.Maximum.Unit,
            icon: "assets/images/" +val.Day.Icon+".png"
            }
          }),
          title: res.Headline.Text
        }
        return obj;
    })).subscribe(res=>{
      this.appState.setWeatherForecast(res)
    })


  }
  getLocations(location: string) {

    this.http.get(this.baseUrl+ 'locations/v1/cities/autocomplete' +`?q=${location}`, {params: this.params})
    .pipe(
      map((res : any) => {
      const obj = res.map((val: any) => {
        return {
          value: val.Key,
          label: val.LocalizedName
        }
      })
      return obj;
    })).subscribe(res=>{
      this.appState.setCountries(res);
    })
    

  }

  getCurrentWeather(location: string) {

    return this.http.get(this.baseUrl+ 'currentconditions/v1/' +`${location}`, {params: this.params})
    .pipe(
      map((res : any) => {
      const obj = res.map((val: any) => {
        return {
          date: val.LocalObservationDateTime,
          val: val.Temperature.Imperial.Value,
          unit: val.Temperature.Imperial.Unit,
          text:val.WeatherText,
          icon: "assets/images/" +val.WeatherIcon+".png"
        }
      })
      return obj[0];
    }))
    

  }


}
