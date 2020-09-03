import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  url = "http://localhost:3000/users";
  isAuthticed: boolean =false;
  constructor(private http: HttpClient) { }
  
  registerUser(data){
    console.warn("Server register a User", data)
    return this.http.post(this.url, data);
  }
  getAllUsers(){
    console.warn('Service get list restaurant');
    return this.http.get(this.url);
  }
  checkLoginUser(data){
    return true;
  }
  loginUser(data){
    console.warn("isAuthticed befor check Login: ", this.isAuthticed)
    if(this.checkLoginUser(data)){
      this.isAuthticed = true;
    console.warn("isAuthticed after check Login: ", this.isAuthticed)
      return true;
    }
    else{
      this.isAuthticed = false;
    console.warn("isAuthticed after check Login: ", this.isAuthticed)
      return false;
    }

  }

}
