import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  private apiKey: string = "bdd9b276a8c66b10ff78da8d6a6f0ba8";
  private urlApi: string = "https://api.openweathermap.org/data/2.5/weather"
  constructor(private http: HttpClient) { }
  
  getWeatherDatas(cityName: string): Observable<any>{
    return this.http.get(`${this.urlApi}?q=${cityName}&units=metric&mode=json&appid=${this.apiKey}`, {})
  } 
}
