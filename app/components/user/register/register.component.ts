import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { UserServicesService } from '../../services/user-services.service';
import { NotifierService } from 'angular-notifier';

//import { AlertService, UserService } from '../_services';

@Component({templateUrl: 'register.component.html', styleUrls: ['./register.component.css']})
export class RegisterComponent implements OnInit { 
    registerForm: FormGroup;
    loading = false;
    submitted = false; 

    private readonly notifier: NotifierService;


    constructor(

        private formBuilder: FormBuilder,
        private router: Router,
        private userService: UserServicesService,
        //private alertService: AlertService
        notifierService: NotifierService
        ) { 
            this.notifier = notifierService;
        }

    ngOnInit() {

        this.registerForm = this.formBuilder.group({
            email: ['', [Validators.required, Validators.email, Validators.minLength(3), Validators.maxLength(50)]],
            name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
            username: [''],
            phonenumber: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
            password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(100)]],
            hideRequired: [false, Validators.pattern('true')]
        });

        
    }

    // convenience getter for easy access to form fields
    get f() { return this.registerForm.controls; }
    
    onSubmit() {
        console.log('register');
        this.submitted = true;
        
        this.f.username = this.f.email;
        // stop here if form is invalid
        if (this.registerForm.invalid) {
            return;
        }

        this.loading = true;
        this.userService.register(this.registerForm.value)//.pipe(map(resultado => {}));
            .pipe(first())
            .subscribe(
                data => {
                    //this.alertService.success('Registration successful', true);
                    this.notifier.notify( 'success', 'Registration successful!' );
                    this.router.navigateByUrl('/login');
                },
                error => {
                    //this.alertService.error(error);
                    if(!error.error)
                        this.notifier.notify('error', error.error.errors[0].defaultMessage);
                    else
                        this.notifier.notify('error', error.message);

                    console.log(error.error.errors);
                    console.log(error.message);
                    this.loading = false; 
                    this.submitted = false;
                });               
       
    }

}
