import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { IOrders } from '../model/order';
import { Globals } from '../../globals';

@Injectable({
  providedIn: 'root'
})
export class OrderServiceService {

  //url = 'http://localhost:8092';
  constructor(public http: HttpClient, private globals: Globals) { 

  }

  addOrders(ord:IOrders) {
    console.log(`${this.globals.urlServiceOrders}/api/orders/create`);
    console.log(JSON.stringify(ord));
    let httpHeaders = new HttpHeaders()
     .set('Content-Type', 'application/json')
     .set('Cache-Control', 'no-cache')  
     .set('Access-Control-Allow-Origin','*');

     let options = {
      headers: httpHeaders
      }; 

    return this
            .http
            .post(`${this.globals.urlServiceOrders}/api/orders/create`,JSON.stringify(ord), options);
        


    /*return this
    .http
    .post(`${this.url}/api/orders/create`,JSON.stringify(ord));*/     
}
}
