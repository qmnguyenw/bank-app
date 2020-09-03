import { Component, OnInit } from '@angular/core';
import {AccountService} from '../api.service';
import {FormGroup, FormControl} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-update-account',
  templateUrl: './update-account.component.html',
  styleUrls: ['./update-account.component.css']
})
export class UpdateAccountComponent implements OnInit {
  editAccount = new FormGroup({
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

  alert: boolean = false;

  constructor(private router: ActivatedRoute, private api: AccountService) { }

  ngOnInit() {
    console.warn(this.router.snapshot.params.id);
    this.api.getCurrentAccount(this.router.snapshot.params.id).subscribe((result) =>{

      console.warn("Component get account from service: ", result);
      this.editAccount = new FormGroup({
        id: new FormControl(result['id']),
        account_number: new FormControl(result['account_number']),
        balance: new FormControl(result['balance']),
        firstname: new FormControl(result['firstname']),
        lastname: new FormControl(result['lastname']),
        age: new FormControl(result['age']),
        gender: new FormControl(result['gender']),
        address: new FormControl(result['address']),
        email: new FormControl(result['email']),
        employer: new FormControl(result['employer']),
        city: new FormControl(result['city']),
        state: new FormControl(result['state']),
      })
    })
  }

  updateAccount(){
    console.warn("Component update account: ", this.editAccount.value);
    this.api.updateAccount(this.router.snapshot.params.id, this.editAccount.value).subscribe((result) => {
      this.alert = true;
      console.warn("result: ", result);
    });
  }

  closeAlert(){
    this.alert = false;
  }

}
