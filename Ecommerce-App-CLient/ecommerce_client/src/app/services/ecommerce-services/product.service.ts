import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { VmSaveProduct } from '../model/VmSaveProduct';


@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private httpClient: HttpClient) {
  }


  private apiURL = 'https://localhost:7058/api/product/'; // Replace with your API endpoint URL


  addProduct(vmSaveProduct: any): Observable<any> {
    return this.httpClient.post(this.apiURL+'SaveOrUpdateProduct', vmSaveProduct);
  }

  getProductForCard(): Observable<any> {
    return this.httpClient.get(this.apiURL+'GetProductList');
  }

  getProductById(obj:any): Observable<any> {
    return this.httpClient.post(this.apiURL+'GetProductByID',obj);
  }

  // postAttendance(formData) {
  //   return this.httpClient.post(this.rootURL + 'Attendance/PostAttendance', formData);
  // }

  // putAttendance(AttendanceeId, data) {
  //   return this.httpClient.put(this.rootURL + 'Attendance/PutAttendance/' + AttendanceeId, data);
  // }
  // deleteAttendance(AttendanceId: number) {
  //   return this.httpClient.delete(this.rootURL + 'Attendance/DeleteById/' + AttendanceId);
  // }

  // getAttendance(pageNumber, pageDataLimit) {
  //   return this.httpClient.get(this.rootURL + `Attendance/GetAttendanceList?pageNumber=${pageNumber}&pageDataLimit=${pageDataLimit}`);
  // }
  // getAttendanceId(AttendanceId) {
  //   return this.httpClient.get(this.rootURL + 'Attendance/GetAttendanceById/' + AttendanceId);
  // }
}
