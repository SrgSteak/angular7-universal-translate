import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'beta',
  template: '<p>beta works!</p>',
})
export class BetaComponent implements OnInit {

  public townslug: string;

  constructor() {
  }

    ngOnInit() {}
}