import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ProductService } from 'src/app/services/ecommerce-services/product.service';
import { Product } from 'src/app/services/model/Product';
import { RequestMessage } from 'src/app/services/model/RequestMessage';
import { VmSaveProduct } from 'src/app/services/model/VmSaveProduct';

@Component({
  selector: 'app-addproduct',
  templateUrl: './addproduct.component.html',
  styleUrls: ['./addproduct.component.css']
})
export class AddproductComponent implements OnInit{
  productForm!: FormGroup;
  vmSaveProduct!: VmSaveProduct ;
  requestMessage:RequestMessage= new RequestMessage();
  urls:any = [];
  productId:number=0;

  constructor(private fb: FormBuilder,private toastr: ToastrService, private productService: ProductService,private _router: Router, private _avRoute: ActivatedRoute) { }
  ngOnInit(): void {
    this.productId = this._avRoute.snapshot.params['id'] > 0?this._avRoute.snapshot.params['id']:0;
    this.createForm();
    if (this.productId>0){
      this.getProductById();
    }

  }

  createForm() {
    this.productForm = this.fb.group({
      productName: ['', Validators.required],
      quantity: [0, Validators.required],
      basePrice: [0, Validators.required],
      discountPercent: [0, Validators.required],
      discountPrice: [0, Validators.required],
      description: [''],
      imageName: ['', Validators.required]
    });
  }

  onSave() {
    const product = {
      productID:this.productId,
      productName: this.productForm.value.productName,
      quantity: this.productForm.value.quantity,
      basePrice: this.productForm.value.basePrice,
      discountPercent: this.productForm.value.discountPercent,
      discountPrice: 0,
      description: this.productForm.value.description
    };

    const image = {
      ImageID: 0,
      ImageName: this.productForm.value.imageName,
      ProductID: 0
    };

    const data = {
      Product:product,
      ImageList: this.urls

    };
    this.requestMessage.RequestObj=data;
    console.log('check data',data);

    this.productService.addProduct(this.requestMessage).subscribe((res: any) => {
      console.log(res);
      this._router.navigate(['/product-list']);
    });
  }

  getProductById() {
    const data = {
      MyID:this._avRoute.snapshot.params['id']

    };
    console.log('aaaaa',data);

    this.requestMessage.RequestObj=data;

    this.productService.getProductById(this.requestMessage).subscribe(data => {
      console.log("res",data);
      const res = data.responseObj.product;
      const img = data.responseObj.imageList.length > 0 ? data.responseObj.imageList[0].imageName : ''  ;

      this.productForm = this.fb.group({
        productName: res.productName,
        quantity:res.quantity,
        basePrice: res.basePrice,
        discountPercent: res.discountPercent,
        discountPrice: res.discountPrice,
        description: res.description,
        imageName: img,
      });
    });
  }

  onSelectFile(event:any) {
    if (event.target.files && event.target.files[0]) {
        var filesAmount = event.target.files.length;
        for (let i = 0; i < filesAmount; i++) {
                var reader = new FileReader();

                reader.onload = (event:any) => {
                  console.log('check image data',event.target.result);
                  const image= {
                    ImageName : event.target.result
                  }
                  this.urls.push(image);
                  console.log('check array ',this.urls);


                  //  this.urls.push(event.target.result);
                }

                reader.readAsDataURL(event.target.files[i]);
        }
    }
  }


  onUpdate() {
    const product = {
      productID: this.productId,
      productName: this.productForm.value.productName,
      quantity: this.productForm.value.quantity,
      basePrice: this.productForm.value.basePrice,
      discountPercent: this.productForm.value.discountPercent,
      discountPrice: 0,
      description: this.productForm.value.description
    };

    const image = {
      ImageID: 0,
      ImageName: this.productForm.value.imageName,
      ProductID: this.productId
    };

    const data = {
      Product:product,
      ImageList: this.urls
    };

    this.requestMessage.RequestObj=data;
    console.log('check data',data);

    this.productService.addProduct(this.requestMessage).subscribe((res: any) => {
      console.log(res);
      this._router.navigate(['/product-list']);
    });
  }

  saveOrUpdate(){
    if (this.productId>0){
      this.onUpdate();
    } else {
      this.onSave();
    }
  }
}
