import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { DateParsePipe } from './shared/pipes/date-parse.pipe';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { ToastrModule } from 'ngx-toastr';
import { HttpConfigInterceptor } from './shared/interceptors/httpConfig.interceptor';
import { WeatherDetailsComponent } from './components/weather-details/weather-details.component';
import { SearchComponent } from './components/weather-details/search/search.component';
import { FavoritesComponent } from './components/favorites/favorites.component';
import { HeaderComponent } from './components/header/header.component';
import { FToCPipe } from './shared/pipes/f-to-c.pipe';
import {MatCheckboxModule} from '@angular/material/checkbox';

@NgModule({
  declarations: [
    AppComponent,
    WeatherDetailsComponent,
    SearchComponent,
    FavoritesComponent,
    HeaderComponent,
    DateParsePipe,
    FToCPipe
  ],
  imports: [
    MatButtonToggleModule,
    BrowserModule,
    ToastrModule.forRoot({
      timeOut: 2000,
      preventDuplicates: true,
      positionClass: 'toast-bottom-center',
    }), // ToastrModule added
    MatAutocompleteModule,
    MatProgressBarModule,
    MatCardModule,
    MatProgressSpinnerModule,
    HttpClientModule,
    AppRoutingModule,
    MatIconModule,
    MatCheckboxModule,
    FormsModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    BrowserAnimationsModule

  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpConfigInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
