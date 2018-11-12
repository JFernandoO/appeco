import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Globals } from '../../globals';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

    private loggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

    get isLoggedIn() {
        return this.loggedIn.asObservable();
    }

    public getTheBoolean(): Observable<boolean> {
        return this.loggedIn.asObservable();
    }
    
    public setTheBoolean(newValue: boolean): void {
        this.loggedIn.next(newValue);
    }

    constructor(private http: HttpClient, private globals: Globals) { }
    
    login(username: string, password: string) {
        console.log(this.globals.urlServiceSecurity+'/api/auth/signin');
        let httpHeaders = new HttpHeaders()
            .set('Content-Type', 'application/json')
            .set('Cache-Control', 'no-cache')  
            .set('Access-Control-Allow-Origin','*');

        let options = {
            headers: httpHeaders
        }; 

        return this.http.post<any>(`${this.globals.urlServiceSecurity}/api/auth/signin`, { username, password }, options)
            .pipe(map(user => {
                // login successful if there's a jwt token in the response
                
                if (user && user.accessToken) {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    this.loggedIn.next(true);
                    localStorage.setItem('tokenUser', JSON.stringify(user.accessToken));
                    
                }

                return user;
            }));
    }

    logout() {
        this.loggedIn.next(false);
        // remove user from local storage to log user out
        localStorage.removeItem('tokenUser');
    }
}
