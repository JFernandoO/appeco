import { Injectable } from '@angular/core';

@Injectable()
export class Globals {
  urlServiceSecurity: string = 'http://localhost:8097';
  urlServiceProducts: string = 'http://localhost:8096';
  urlServiceOrders: string = 'http://localhost:8092';
  urlServiceMail: string = 'http://localhost:8091';
}