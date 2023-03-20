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

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
    DemoComponent,
    LoginComponent,
    ProductlistComponent,
    AddproductComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule
  ],
  providers: [AuthGuard,AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
