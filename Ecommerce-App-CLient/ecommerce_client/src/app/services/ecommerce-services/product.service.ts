import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { VmSaveProduct } from '../model/VmSaveProduct';


@Injectable({
  providedIn: 'root'
})
export class ProductService {
 token :any;
  constructor(private httpClient: HttpClient) {
    this.token=localStorage.getItem('Token');
  }

  

  private apiURL = 'https://localhost:7058/api/product/'; // Replace with your API endpoint URL


  addProduct(vmSaveProduct: any): Observable<any> {
    let header = new HttpHeaders().set("Authorization", 'Bearer ' + this.token);
    return this.httpClient.post(this.apiURL+'SaveOrUpdateProduct', vmSaveProduct,{ headers: header });
  }

  getProductForCard(): Observable<any> {
    let header = new HttpHeaders().set("Authorization", 'Bearer ' + this.token);
    return this.httpClient.get(this.apiURL+'GetProductList',{ headers: header });
  }

  getProductById(obj:any): Observable<any> {
    let header = new HttpHeaders().set("Authorization", 'Bearer ' + this.token);
    return this.httpClient.post(this.apiURL+'GetProductByID',obj,{ headers: header });
  }

}
