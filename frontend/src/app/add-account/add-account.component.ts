import { Component, OnInit } from '@angular/core';
import { AccountService } from '../api.service';
import {FormGroup, FormControl} from '@angular/forms';
@Component({
  selector: 'app-add-resto',
  templateUrl: './add-account.component.html',
  styleUrls: ['./add-account.component.css']
})
export class AddAccountComponent implements OnInit {
  newAccount = new FormGroup({
    id: new FormControl(),
    account_number: new FormControl(''),
    balance: new FormControl(''),
    firstname: new FormControl(''),
    lastname: new FormControl(''),
    age: new FormControl(''),
    gender: new FormControl(''),
    address: new FormControl(''),
    email: new FormControl(''),
    employer: new FormControl(''),
    city: new FormControl(''),
    state: new FormControl('')
  });
  alert:boolean = false;
  constructor(private api: AccountService ) { }

  ngOnInit() {
  }
  account_number2: number;
  
  collectAccount(){
    console.warn("Account Number: ", this.account_number2);
    this.api.saveAccount(this.newAccount.value).subscribe((result) => {
      console.warn("New Account is: ", result);
      this.alert = true;
      this.newAccount.reset({});
    });


  }
  closeAlert(){
    this.alert = false;
  }

}
