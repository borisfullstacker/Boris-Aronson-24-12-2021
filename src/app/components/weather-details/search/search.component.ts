import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AbstractControl, FormControl, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { debounceTime, distinctUntilChanged, map, takeWhile } from 'rxjs/operators';
import { StateStoreService } from 'src/app/shared/services/state-store.service';
import { WeatherHttpRequestsService } from 'src/app/shared/services/weather-http-request.service';
import { Country } from '../../weather-app-model';


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  constructor(private http: WeatherHttpRequestsService, public appState: StateStoreService, private router: Router) {

  }
  @Output() selected = new EventEmitter<any>();
  subscriber: any
  searchControl = new FormControl('', this.textValidator(/[^a-zA-Z \-\']+/));
  options: Country[] = []
  apiKey: any = ''
  subscribe: boolean = true
  formValid: boolean = true;





  textValidator(exp: RegExp): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const testStr = typeof control.value === 'string' ? control.value : control.value.label;
      const forbidden = exp.test(testStr);
      return forbidden ? { forbiddenText: true } : null;
    };
  }



  ngOnInit() {


    this.subscriber = this.appState.searchResultsEmitter.subscribe((res) => {
      if(res[0] && res[0].label){
        this.options = res;

      }
    })


    this.searchControl.valueChanges.pipe(takeWhile(() => this.formValid), debounceTime(500)
      ,distinctUntilChanged())
      .subscribe(data => {
        this.appState.setFieldState(this.router.url, 'searchField', data)
        if (data !== '' && !this.searchControl.errors) {
          this.http.getLocations(data)
        }
      });




    const value = this.appState.getFormState(this.router.url, 'searchField')
    if (value) {
      this.searchControl.patchValue(value);
    }

  }


  displayFn(country: any): string {
    return country && country.label ? country.label : country;
  }

  onSelect() {
      this.appState.setSelectedCountry(this.searchControl.value)
      this.selected.emit(this.searchControl.value)
  }

  ngOnDestroy() {
    if (this.subscriber) this.subscriber.unsubscribe()
  }
}
