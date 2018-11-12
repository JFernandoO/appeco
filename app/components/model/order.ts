export interface IOrders {
    id : number;
    address1 : string;
    aptounit : string;
    suburb : string;
    city: string;
    state: string;
    zipCode: string,
    
    dateOrder : string;
    timeOrder : string;
    createOrder : string;


    userId : string;
    email : string;
        
    phoneNumber1: string,
    phoneNumber2: string,
    observations: string,

    orderDetails: Object;
}


export interface IOrdersDetails {
    id: number
    idProduct: number,
    unitPrice: number,
    quantity: number,
    discount: number,
    total: number 
}