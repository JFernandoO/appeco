import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'; 


import { MaterialModule } from './material.module';
import { NotifierModule, NotifierOptions } from 'angular-notifier';

import { AppComponent } from './app.component';
import { NavbarComponent } from './components/shared/navbar/navbar.component';
import { CleanOrderComponent } from './components/clean-order/clean-order.component';
import { HomeComponent } from './components/home/home.component';

// Routes
import { APP_ROUTING } from "./app.routes";
import { LoginComponent } from './components/user/login/login.component';
import { RegisterComponent } from './components/user/register/register.component';
import { AboutComponent } from './components/about/about.component';
import { ContactComponent } from './components/contact/contact.component';

//Providers
import { Globals } from './globals';
import { JwtInterceptor } from './components/security/jwt.interceptor';
import { ErrorInterceptor } from './components/security/error.interceptor';

const customNotifierOptions: NotifierOptions = {
	position: {
		horizontal: {
			position: 'middle',
			distance: 12
		},
		vertical: {
			position: 'top',
			distance: 12,
			gap: 10
		}
	},
	theme: 'material',
	behaviour: {
		autoHide: 10000,
		onClick: false,
		onMouseover: 'pauseAutoHide',
		showDismissButton: true,
		stacking: 8
	},
	animations: {
		enabled: true,
		show: {
			preset: 'slide',
			speed: 300,
			easing: 'ease'
		},
		hide: {
			preset: 'fade',
			speed: 300,
			easing: 'ease',
			offset: 50
		},
		shift: {
			speed: 300,
			easing: 'ease'
		},
		overlap: 150
	}
};


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    CleanOrderComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
	AboutComponent,
	ContactComponent	       
  ],
  imports: [
    BrowserModule,
    APP_ROUTING,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    HttpClientModule,
    NotifierModule.withConfig( customNotifierOptions )
    
  ],
  providers: [	
	  	{ provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
		{ provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
		Globals 
	],
  bootstrap: [AppComponent]
})

export class AppModule { }
