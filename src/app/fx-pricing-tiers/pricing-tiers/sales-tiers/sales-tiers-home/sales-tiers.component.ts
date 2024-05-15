import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-sales-tiers',
  templateUrl: './sales-tiers.component.html',
  styleUrls: ['./sales-tiers.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SalesTiersComponent implements OnInit {

  constructor() {
    console.log("sales tier called...");
  }

  ngOnInit() {
  }

}
