import { Component, OnInit, Inject } from '@angular/core';
import {AccountService} from '../api.service';
import { DOCUMENT } from '@angular/common';
@Component({
  selector: 'app-list-account',
  templateUrl: './list-account.component.html',
  styleUrls: ['./list-account.component.css']
})
export class ListAccountComponent implements OnInit {

  constructor(private api: AccountService, @Inject(DOCUMENT) private _document: Document) { }
  refreshPage() {
    this._document.defaultView.location.reload();
  }
  collection: any;
  ngOnInit(): void {
    this.api.getListAccount().subscribe((result) => {
      console.warn(result);
      this.collection = result;
    })
  }
  deleteAccount(item){
    // this.collection.splice(item-1, 1);
    this.api.deleteAccount(item).subscribe((result) =>{
      console.warn("result", result);
      this.refreshPage();
    });
  }

}
