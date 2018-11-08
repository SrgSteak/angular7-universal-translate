import { Component } from '@angular/core';
import { LocalizeRouterService } from '@gilsdav/ngx-translate-router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})
export class AppComponent  {

  constructor(private localizeRouterService: LocalizeRouterService, router: Router) {
    console.log('=================================');
    console.log(router.config[0].children[0]); // all routes are double??
    console.log(router.config[0].children[1]);
    // console.log(router.config[0].children[2]);
    console.log('=================================');
  }

  switchLang(lang: string): void {
    this.localizeRouterService.changeLanguage(lang);
  }
}
