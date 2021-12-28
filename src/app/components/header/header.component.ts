import { Component, OnInit } from '@angular/core';
import { StateStoreService } from 'src/app/shared/services/state-store.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private appState:StateStoreService) { }

  ngOnInit(): void {
  }
  
  toggleFar(){
    this.appState.toggleFahrenheit()
  }

}
