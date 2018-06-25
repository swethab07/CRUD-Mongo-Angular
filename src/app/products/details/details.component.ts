import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { ProductsService } from '../products.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {

  products :any =[];
  pId: any= "";

  constructor(private _activatedroute: ActivatedRoute, private _router: Router, private _productService: ProductsService) { }

  ngOnInit() {
  	this._activatedroute.params.subscribe((data)=>{
  		this.pId= data.pId;
  		console.log(data);
	    // this._productService.getProducts().subscribe((data) => {
     //    this.products = data.filter((item) => {
     //      if(item.productCode==this.pId) {
     //        return true;
     //      }
     //    });
      // })
	    console.log(this.products);
  	});
  }

  gotoproducts(){
  	this._router.navigate(['/products']);
  }

}
