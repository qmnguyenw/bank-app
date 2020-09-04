import { Component, OnInit } from '@angular/core';
import {FormGroup, FormControl} from '@angular/forms';
import {AuthenticationService} from '../authentication.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl('')
  })
  constructor(private authserver: AuthenticationService) { }

  ngOnInit() {
  }
  loginUser(){
    console.warn("Component make a login form", this.loginForm.value);
    this.authserver.login(this.loginForm.value)
  }
}
