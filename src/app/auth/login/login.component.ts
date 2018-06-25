import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  authDetails: any={};

  constructor(private _authservice: AuthService) { }

  ngOnInit() {
  }

  login(){
  	console.log(this.authDetails);
  	this._authservice.login(this.authDetails);
  }

}
