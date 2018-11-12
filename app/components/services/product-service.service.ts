import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Globals } from '../../globals';

@Injectable({
  providedIn: 'root'
})
export class ProductServiceService {

  //url = 'http://localhost:8096';
  constructor(public http: HttpClient, private globals: Globals) { 

  }

  getProducts() {
    return this
            .http
            .get(`${this.globals.urlServiceProducts}/api/products`);
        }
}

