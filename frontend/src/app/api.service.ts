import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root',
})
export class AccountService {
  url = 'http://127.0.0.1:5000/api';
  constructor(private http: HttpClient) {}

  getListAccount(N) {
    console.warn('Service get list accounts');
    return this.http.get(`${this.url}/accounts/${N}`);
  }
  saveAccount(data) {
    console.warn('Service Save', data);
    return this.http.post(`${this.url}/account`, data);
  }
  deleteAccount(_id) {
    console.warn('Service Delete a Account: ', `${this.url}/${_id}`);
    return this.http.delete(`${this.url}/account/${_id}`);
  }
  getCurrentAccount(_id) {
    console.warn(
      'Service get a current Account: ',
      `${this.url}/account/${_id}`
    );
    return this.http.get(`${this.url}/${_id}`);
  }
  updateAccount(id, data) {
    console.warn('Service update a account: ', `${this.url}/${id}`, data);
    return this.http.put(`${this.url}/${id}`, data);
  }
}
