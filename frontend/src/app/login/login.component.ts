import { Component } from '@angular/core'
import { AuthenticationService, TokenPayload } from '../authentication.service'
import { Router } from '@angular/router'


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

@Component({
  templateUrl: './login.component.html'
})
export class LoginComponent {
  credentials: TokenPayload = {
    _id: '',
    first_name: '',
    last_name: '',
    email: '',
    password: ''
  }

  constructor(private auth: AuthenticationService, private router: Router) {}

  login() {
    if(this.auth.isLoggedIn()){
      this.router.navigateByUrl('/profile')
    }
    else{
      this.auth.login(this.credentials).subscribe(
        () => {
          this.router.navigateByUrl('/profile')
        },
        err => {
          console.error(err)
        }
      )
    }
   
  }
}
