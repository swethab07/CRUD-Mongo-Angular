import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule} from '@angular/router';
import {FormsModule} from '@angular/forms';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';


import { ProductsComponent } from '../products/products.component';
import { ProductsPipe } from '../products.pipe';
import { RatingComponent } from '../rating/rating.component';
import { DetailsComponent } from '../details/details.component';
import { AuthGuard } from './../../auth/auth.guard';
import { AuthintercepterService } from '../../auth/authintercepter.service';
import { ProductsService } from '../products.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forChild([    	
	        { path:"", component:ProductsComponent, canActivate:[AuthGuard] },
	        { path:"details/:pId", component:DetailsComponent }
        ])
  ],
  declarations: [
  	ProductsComponent,
  	ProductsPipe,
  	RatingComponent,
  	DetailsComponent
  ],
   providers: [AuthGuard,ProductsService,
   	{
	    provide: HTTP_INTERCEPTORS,
	    useClass: AuthintercepterService,
	    multi: true
	}
	]
})
export class ProductsModule { }
