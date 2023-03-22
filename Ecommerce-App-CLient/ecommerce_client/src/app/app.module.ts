import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterComponent } from './modules/user-module/footer/footer.component';
import { HeaderComponent } from './modules/user-module/header/header.component';
import { SidebarComponent } from './modules/user-module/sidebar/sidebar.component';
import { DemoComponent } from './modules/user-module/demo/demo.component';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './modules/user-module/login/login.component';
import { AuthGuard } from './services/auth-services/authGuard';
import { AuthService } from './services/auth-services/AuthService';
import { ProductlistComponent } from './modules/product-module/productlist/productlist.component';
import { AddproductComponent } from './modules/product-module/addproduct/addproduct.component';
import { HttpClientModule } from '@angular/common/http';
import { CmsProductComponent } from './modules/product-module/cms-product/cms-product.component';
import { UserlistComponent } from './modules/user-module/userlist/userlist.component';
import { AddUserComponent } from './modules/user-module/add-user/add-user.component';
import { ToastrModule } from 'ngx-toastr';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
    DemoComponent,
    LoginComponent,
    ProductlistComponent,
    AddproductComponent,
    CmsProductComponent,
    UserlistComponent,
    AddUserComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    ToastrModule.forRoot(), // ToastrModule added
  ],
  providers: [AuthGuard,AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
