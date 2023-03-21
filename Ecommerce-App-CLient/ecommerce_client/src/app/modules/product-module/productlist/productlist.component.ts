import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/ecommerce-services/product.service';
import { VmSaveProduct } from 'src/app/services/model/VmSaveProduct';

@Component({
  selector: 'app-productlist',
  templateUrl: './productlist.component.html',
  styleUrls: ['./productlist.component.css']
})
export class ProductlistComponent implements OnInit {
  vmSaveProduct: any ;
  demoImg:string="assets/img/demo.jpg"
 constructor(private productService: ProductService){

 }
  ngOnInit(): void {
    this.getProductList();
  }

  getProductList(){
    this.productService.getProductForCard().subscribe((res: any) => {
      console.log(res);
      this.vmSaveProduct=res.responseObj;
      console.log(res);

    });
  }
}
