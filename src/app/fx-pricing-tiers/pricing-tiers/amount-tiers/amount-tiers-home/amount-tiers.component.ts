import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-amount-tiers',
  templateUrl: './amount-tiers.component.html',
  styleUrls: ['./amount-tiers.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AmountTiersComponent implements OnInit {

  constructor() {
    console.log("amount tier called...");
  }

  ngOnInit() {
  }

}
