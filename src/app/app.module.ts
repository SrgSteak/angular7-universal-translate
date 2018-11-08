import {BrowserModule} from "@angular/platform-browser";
import {NgModule} from '@angular/core';
import { AppComponent } from './app.component';
import { ShopModule } from './pages/shop/shop.module';
import { AppClientModule, routes } from "./app.client.module";
import { BetaComponent } from "./beta.component";
import { TranslateModule, TranslateLoader } from "@ngx-translate/core";
import { HttpClient } from "@angular/common/http";
import { TranslateHttpLoader } from "@ngx-translate/http-loader";

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, `http://localhost:4000/assets/i18n/`, '.json');
}

@NgModule({
  imports: [
    BrowserModule.withServerTransition({appId: 'angular7-universal-translate'}),
    AppClientModule,
    ShopModule,
    TranslateModule.forRoot({
      loader: {
          provide: TranslateLoader,
          useFactory: (createTranslateLoader),
          deps: [HttpClient]
      }
    })
  ],
  declarations: [AppComponent, BetaComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }