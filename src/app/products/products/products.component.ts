import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ProductsService } from '../products.service';


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit, OnDestroy {

  pageTitle: string ='Products - list';

  products :any =[];
  showHideImg: boolean= true;

  filterby: string= "";

  index:number;

  constructor(private _productService: ProductsService, private _http: HttpClient) { }

  ngOnInit() {
  	console.log("Products Component has Changed!");
    this._productService.getProducts().subscribe((data)=>{
      this.products = data;
      console.log(data);
    });
  }

  ngOnDestroy(){

  }

  toggleImage(): void{
    this.showHideImg= !this.showHideImg;
  }

  
  ratingEventFn(data: string){
    console.log(data);
    this.pageTitle= data;
  }

  delete(item: any){
    console.log(item);
    this._http.get('http://localhost:3000/delete/'+item._id).subscribe((res: any)=>{
      this.index= this.products.indexOf(item);
      if(this.index!== -1){
        this.products.splice(this.index, 1);  
    }
    });
  }

}
