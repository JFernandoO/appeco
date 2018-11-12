import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: []
})

export class HomeComponent implements OnInit {

  tokenUser  : string ="-"
  constructor() { }

  ngOnInit() {
 
    this.tokenUser = localStorage.getItem('tokenUser');
    console.log(this.tokenUser);
  }

}
