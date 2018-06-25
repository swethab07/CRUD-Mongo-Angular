import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';


import { AppComponent } from './app.component';
import { HomeComponent } from './layout/home/home.component';
import { NavigationComponent } from './layout/navigation/navigation.component';
import { LoginComponent } from './auth/login/login.component';
import { AddproductsComponent } from './products/addproducts/addproducts.component';

import { AuthService } from './auth/auth.service';
import { CookieService } from 'ngx-cookie-service';
import { AuthGuard } from './auth/auth.guard';
import { LogoutComponent } from './auth/logout/logout.component';
import { AuthintercepterService } from './auth/authintercepter.service';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavigationComponent,
    LoginComponent,
    LogoutComponent,
    AddproductsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot([
        { path:"home", component:HomeComponent, canActivate:[AuthGuard] },
        { path:"login", component:LoginComponent},
        { path:"products", loadChildren:"app/products/products/products.module#ProductsModule" },
        { path:"addproducts", component:AddproductsComponent },
        { path:"logout", component: LogoutComponent},
        { path:"", redirectTo:"home", pathMatch:"full" },
        { path:"**", redirectTo:"home" }
      ])
  ],
  providers: [AuthService, CookieService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
