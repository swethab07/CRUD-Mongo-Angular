import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-addproducts',
  templateUrl: './addproducts.component.html',
  styleUrls: ['./addproducts.component.css']
})
export class AddproductsComponent implements OnInit {

	details: any= {};

  constructor(private _http:HttpClient) { }

	adding(){    
		console.log(this.details);
    this._http.post('http://localhost:3000/savedata', this.details).subscribe((err)=>{
      console.log(err);
    });
  }

  ngOnInit() {
  }

}
