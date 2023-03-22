import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddproductComponent } from './modules/product-module/addproduct/addproduct.component';
import { CmsProductComponent } from './modules/product-module/cms-product/cms-product.component';
import { ProductlistComponent } from './modules/product-module/productlist/productlist.component';
import { AddUserComponent } from './modules/user-module/add-user/add-user.component';
import { DemoComponent } from './modules/user-module/demo/demo.component';
import { LoginComponent } from './modules/user-module/login/login.component';
import { UserlistComponent } from './modules/user-module/userlist/userlist.component';
import { AuthGuard } from './services/auth-services/authGuard';

const routes: Routes = [
  {path: '', redirectTo: 'login' ,pathMatch:'full'},
  { path: 'upload-product', component: AddproductComponent, canActivate:[AuthGuard] },
  { path: 'cms-list/edit/:id', component: AddproductComponent , canActivate:[AuthGuard]},
  { path: 'product-list', component: ProductlistComponent, canActivate:[AuthGuard] },
  { path: 'cms-list', component: CmsProductComponent, canActivate:[AuthGuard] },
  { path: 'user-list', component: UserlistComponent, canActivate:[AuthGuard]},
  { path: 'add-user', component: AddUserComponent, canActivate:[AuthGuard]},
  { path: 'user-list/edit/:id', component: AddUserComponent , canActivate:[AuthGuard]},
  { path: 'login', component: LoginComponent },
  { path: '**', redirectTo: 'login',pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
