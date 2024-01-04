import { Component, OnDestroy, OnInit } from '@angular/core';
import { WeatherService } from '../../services/weather.service';
import { Weather } from '../../../../models/interfaces/weather';
import { Subject, takeUntil } from 'rxjs';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-weather-home',
  templateUrl: './weather-home.component.html',
  styleUrls: [],
})
export class WeatherHomeComponent implements OnInit, OnDestroy {
  private readonly destroy$: Subject<void> = new Subject();
  initialCityName: string = 'Porto';
  weatherDatas!: Weather;
  searchIcon = faMagnifyingGlass;

  constructor(private weatherService: WeatherService) {}

  ngOnInit(): void {
    this.getWeatherDatas(this.initialCityName);
  }

  getWeatherDatas(cityName: string): void {
    this.weatherService.getWeatherDatas(cityName)
    .pipe(
      takeUntil(this.destroy$)
      )
    .subscribe({
      // subscrevemos na açao podendo buscar depois pelo Observable
      next: (response) => {
        response && (this.weatherDatas = response);
        console.log(response)
      },
      error: (error) => console.log(error),
    });
  }
  onSubmit():void{
    this.getWeatherDatas(this.initialCityName);
    this.initialCityName = '';
  }
  // destroi o subscribe evitando memory leek
  ngOnDestroy(): void {
      this.destroy$.next();
      this.destroy$.complete(); 
  }
}
