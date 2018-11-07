import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit {

  private url: string;
  private townslug: string;

  constructor(private route: ActivatedRoute) {
    this.url = this.route.paramMap.subscribe(params => {
      this.townslug = params.get('country') + '/' + params.get('province') + '/' + params.get('town');
    });
  }

    ngOnInit() {}
}