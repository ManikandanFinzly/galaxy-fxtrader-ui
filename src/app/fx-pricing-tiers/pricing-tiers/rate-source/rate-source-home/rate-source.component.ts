import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-rate-source',
  templateUrl: './rate-source.component.html',
  styleUrls: ['./rate-source.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class RateSourceComponent implements OnInit {

  constructor() {
    console.log("rate-source called...");
  }

  ngOnInit() {
  }

}
