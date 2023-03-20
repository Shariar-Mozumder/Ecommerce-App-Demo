import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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

  constructor(private fb: FormBuilder, private productService: ProductService) { }
  ngOnInit(): void {
    this.createForm();
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

  onSubmit() {
    const product = {
      productID: 0,
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
    });
  }

  // onFileSelected(event: { target: { files: any; }; }): void {
  //   const files = event.target.files;
  //   for (const file of files) {
  //     this.product.Images.push(file);
  //   }
  // }

  onSelectFile(event:any) {
    if (event.target.files && event.target.files[0]) {
        var filesAmount = event.target.files.length;
        for (let i = 0; i < filesAmount; i++) {
                var reader = new FileReader();

                reader.onload = (event:any) => {
                  console.log('check image data',event.target.result);
                  this.urls.push(event.target.result);
                  console.log('check array ',this.urls);


                  //  this.urls.push(event.target.result);
                }

                reader.readAsDataURL(event.target.files[i]);
        }
    }
  }
}
