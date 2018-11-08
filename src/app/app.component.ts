import { Component } from '@angular/core';
import { LocalizeRouterService } from '@gilsdav/ngx-translate-router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})
export class AppComponent  {

  constructor(private localizeRouterService: LocalizeRouterService, router: Router) {}

  switchLang(lang: string): void {
    this.localizeRouterService.changeLanguage(lang);
  }
}
