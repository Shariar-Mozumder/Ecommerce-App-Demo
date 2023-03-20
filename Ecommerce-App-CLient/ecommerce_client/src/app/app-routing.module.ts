import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddproductComponent } from './modules/product-module/addproduct/addproduct.component';
import { ProductlistComponent } from './modules/product-module/productlist/productlist.component';
import { DemoComponent } from './modules/user-module/demo/demo.component';
import { LoginComponent } from './modules/user-module/login/login.component';
import { AuthGuard } from './services/auth-services/authGuard';

const routes: Routes = [
  {path: '', redirectTo: 'login' ,pathMatch:'full'},
  { path: 'demo', component: DemoComponent, canActivate: [AuthGuard] },
  { path: 'upload-product', component: AddproductComponent, canActivate: [AuthGuard] },
  { path: 'product-list', component: ProductlistComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: '**', redirectTo: ''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
