import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IProduct } from '../model/product';
import { Subject } from 'rxjs';
import { ProductServiceService } from '../services/product-service.service';
import { IOrders, IOrdersDetails  } from '../model/order';
import { OrderServiceService } from '../services/order-service.service';
import { Router, ActivatedRoute } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { Globals } from '../../globals';

@Component({
  selector: 'app-clean-order',
  templateUrl: './clean-order.component.html',
  styleUrls: ['./clean-order.component.css']
})
 

export class CleanOrderComponent implements OnInit {

  orderForm: FormGroup;
  orderShop: IOrders;
  loading = false;
  submitted = false;

  title = "House Clean";
  selectedValueCity: string = "";
  selectedValueBaths: string = "";
  selectedValueHour: string = "";
  selectedValueService: IProduct;

  products: IProduct[] = [];

  
  private readonly notifier: NotifierService;

  cities = [
    { value: "Adelaide", view: "Adelaide" },
    { value: "Melbourne", view: "Melbourne" }
  ];

  hours = [
    { value: "7:00",  view: "7:00" },
    { value: "8:00",  view: "8:00" },
    { value: "9:00",  view: "9:00" },
    { value: "10:00", view: "10:00" },
    { value: "11:00", view: "11:00" },
    { value: "12:00", view: "12:00" },
    { value: "13:00", view: "13:00" },
    { value: "14:00", view: "14:00" },
    { value: "15:00", view: "15:00" },
    { value: "16:00", view: "16:00" },
    { value: "17:00", view: "17:00" },
    { value: "18:00", view: "18:00" },
    { value: "19:00", view: "19:00" },
    { value: "20:00", view: "20:00" }
  ];

  servicesoptions = [
    
  ];

  constructor(private formBuilder: FormBuilder, 
              public _productService: ProductServiceService,
              public _orderService: OrderServiceService,
              private route: ActivatedRoute,
              private router: Router,
              notifierService: NotifierService) { 
                
                this.notifier = notifierService;
              }

  ngOnInit() {

    this.orderForm = this.formBuilder.group({
      
      address: ['', Validators.required],
      apto: [''],
      suburb: ['', Validators.required],
      city: [''],
      zipCode: ['', Validators.required],

      dateorder: ['', Validators.required],
      hourorder: [''],

      email: ['', [Validators.required, Validators.email]],
      username: [''],
      phonenumber: ['', Validators.required ],
      
      service: [''],
  });

  this.selectedValueService = {
    id : null,
    code : "",
    name : "",
    nRooms : 0,
    nBaths : 0,
    price : 0,
    nHours: 0,
    unitPrice: 0,
    discount: 0,
    total: 0,
  };

  this.orderShop = 
      {
        id : null,
        address1 : "",
        aptounit : "",
        suburb : "",
        city: "",
        state: "",
        zipCode: "",
        
        dateOrder : "",
        timeOrder : "",
        createOrder : "",
        
        
        userId : "",
        email : "",
        
        phoneNumber1: "",
        phoneNumber2: "",
        observations: "",
        
        orderDetails: []
      };

  this.getAllProducts();

  }

  getAllProducts():void{
    this
      ._productService
      .getProducts()
      .subscribe((data: IProduct[]) => {
        this.products = data;

        /*for(var i=0;i<this.products.length;i++){
          this.products[i].quantity = 0;
        }*/

      },
      error => {
        this.notifier.notify( 'error', "The products aren't avalaibles");
        });
  } 

  sendOrder(){

    this.orderShop = 
      {
        id : null,
        address1 : this.orderForm.value.address,
        aptounit : this.orderForm.value.apto,
        suburb : this.orderForm.value.suburb,
        city: this.selectedValueCity,
        state: "",
        zipCode: this.orderForm.value.zipCode,

        dateOrder : this.orderForm.value.dateorder,
        timeOrder : this.selectedValueHour,
        createOrder : new Date().getDate().toString(),

        userId : this.orderForm.value.email,
        email : this.orderForm.value.email,
       
        phoneNumber1: this.orderForm.value.phonenumber,
        phoneNumber2: "",
        observations: "",
        orderDetails: [
          {
              id : null,
              idProduct: this.selectedValueService.id,
              unitPrice: this.selectedValueService.unitPrice,
              quantity: 1,
              discount: this.selectedValueService.discount,
              total: this.selectedValueService.total 
          }
        ]
      };
      console.log("Json:");
      console.log(this.orderShop);
      this.loading = true;

      this._orderService.addOrders(this.orderShop).subscribe(
        data => {
            console.log("POST Request is successful ", data);
            //alert("Order created sucessfull!");
            this.notifier.notify( 'success', "Order created sucessfull!");
            this.loading = false;
            this.router.navigateByUrl('/contact');
        },
        error => {
            console.log("Error", error);
            this.notifier.notify( 'error', "Error in Service");
            this.loading = false;
          }
      );

      return false;
    }

   // convenience getter for easy access to form fields
   get f() { return this.orderForm.controls; }

   onSubmit() { 

       this.submitted = true;
       console.log(this.selectedValueService);
       // stop here if form is invalid
       if (this.orderForm.invalid) {
           return;
       }

       this.sendOrder();
      
   }

}
