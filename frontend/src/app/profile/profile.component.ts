import { Component } from '@angular/core';
import { AuthenticationService, UserDetails } from '../authentication.service'
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
  details: UserDetails

  constructor(private auth: AuthenticationService) {}

  ngOnInit() {
    this.details = this.auth.getUserDetails()
  }
}