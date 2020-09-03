import { Component, OnInit } from '@angular/core';
import {FormGroup, FormControl} from '@angular/forms';
import {AuthService} from '../auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm = new FormGroup({
    username: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl('')
  })
  alert:boolean = false;
  constructor(private authserver: AuthService) { }

  ngOnInit() {
  }
  registerUser(){
    console.warn("Component make a register form", this.registerForm.value);
    this.authserver.registerUser(this.registerForm.value).subscribe((result)=>{
      console.warn("New User is: ", result);
      this.alert = true;
    })
  }
  closeAlert(){
    this.alert = false;
  }
}
