import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthServiceService } from '../../services/auth-service.service';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html'
})
export class NavbarComponent implements OnInit {

  /*active : boolean;
  constructor(private authGuard: AuthGuard, ) { 
    this.active = authGuard.canActivateInNavVar();
  }*/
  isActive : boolean;
  isLoggedIn$: Observable<boolean>;

  constructor(private authService: AuthServiceService){}

  ngOnInit() {
    this.isLoggedIn$ = this.authService.isLoggedIn;
    if(!localStorage.getItem('tokenUser'))
    {
      this.authService.setTheBoolean(false);
    } else{
      this.authService.setTheBoolean(true);
    }

    console.log("value:");
    /*this.authService.getTheBoolean().subscribe((value:boolean) => console.log(value))
    console.log(this.authService.getTheBoolean().subscribe(value => console.log(value)));
    console.log(this.isLoggedIn$)*/
    //this.authService.setTheBoolean(true);
    this.isLoggedIn$.subscribe((value:boolean) => this.isActive=value);
    //console.log(this.isActive);
  }

  onLogout() {
    this.authService.logout();
  }

}
