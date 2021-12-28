export class CurrentWeather {
  date: string =''
  val: number = -1
  unit: string =''
  icon: string =''
  text: string= ''
}


export interface Favorite {
    name:string,
    currentWeather:CurrentWeather,
    key:string,
    country:Country
    icon: string,

  }

  export interface Temperature {
    icon: string,
    date: string,
    val: number,
    unit: string,
    text:string,
  }
  
  export interface Forecast {
    dailyTemperatures: Temperature[];
    title: string
  }


  export interface Country {
    value: string,
    label: string
    isFavorite: boolean
  }
  