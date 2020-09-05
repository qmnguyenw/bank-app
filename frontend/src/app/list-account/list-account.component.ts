import { Component, OnInit, Inject, Input } from "@angular/core";
import { AccountService } from "../api.service";
import { DOCUMENT } from "@angular/common";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-list-account",
  templateUrl: "./list-account.component.html",
  styleUrls: ["./list-account.component.css"],
})
export class ListAccountComponent implements OnInit {
  constructor(
    private api: AccountService,
    @Inject(DOCUMENT) private _document: Document,
    private router: ActivatedRoute
  ) {}
  refreshPage() {
    this._document.defaultView.location.reload();
  }
  total_number_pages: any;
  page_display: any;
  collection: any;
  page: number = 1;
  ngOnInit(): void {
    console.warn("Router snapshot: ", this.router.snapshot.params.N);
    this.page = this.router.snapshot.params.N;
    this.api.getListAccount(this.page).subscribe((result) => {
      console.warn(result);
      this.collection = result["result"];
      this.total_number_pages = Array(result["total_number_pages"])
        .fill(0)
        .map((x, i) => i + 1);
    });
    // if( this.page == 5){
    // this.page_display = this.total_number_pages.push(this.page.i, this.page+3)
    console.log(this.page_display);
    // }
  }

  getPage(page_number) {
    console.warn("Current page: ", page_number);
    this.page = page_number;
    this.api.getListAccount(page_number).subscribe((result) => {
      console.warn(result);
      this.collection = result["result"];
      this.total_number_pages = Array(result["total_number_pages"])
        .fill(0)
        .map((x, i) => i + 1);
    });
  }
  deleteAccount(item) {
    // this.collection.splice(item-1, 1);
    this.api.deleteAccount(item).subscribe((result) => {
      console.warn("result", result);
      this.refreshPage();
    });
  }
}
