import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../model/user';
import { Globals } from '../../globals';

@Injectable({
  providedIn: 'root'
})
export class UserServicesService {

  //urlServer: string ="http://localhost:8097";
  
  constructor(private http: HttpClient, private globals: Globals) { }

    getAll() {
        return this.http.get<User[]>(`${this.globals.urlServiceSecurity}/users`);
    }

    /*getById(id: number) {
        return this.http.get(this.urlServer+`/users/` + id);
    }*/

    register(user: User)  {
        let httpHeaders = new HttpHeaders()
            .set('Content-Type', 'application/json')
            .set('Cache-Control', 'no-cache')  
            .set('Access-Control-Allow-Origin','*');

        let options = {
            headers: httpHeaders
        }; 

        user.role = [];
        console.log(JSON.stringify(user));

        let result = this.http.post(`${this.globals.urlServiceSecurity}/api/auth/signup`, user ,options);
        return result;
    }

    /*update(user: User) {
        return this.http.put(this.urlServer+`/users/` + user.id, user);
    }*/

    /*delete(id: number) {
        return this.http.delete(this.urlServer+`/users/` + id);
    }*/
}

