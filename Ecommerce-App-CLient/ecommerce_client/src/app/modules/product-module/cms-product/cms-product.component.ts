import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/ecommerce-services/product.service';

@Component({
  selector: 'app-cms-product',
  templateUrl: './cms-product.component.html',
  styleUrls: ['./cms-product.component.css']
})
export class CmsProductComponent implements OnInit {
  vmSaveProduct:any;
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
