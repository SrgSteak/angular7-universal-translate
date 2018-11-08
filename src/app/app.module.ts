import {BrowserModule} from "@angular/platform-browser";
import {NgModule} from '@angular/core';
import { AppComponent } from './app.component';
import { ShopModule } from './pages/shop/shop.module';
import { AppClientModule, routes } from "./app.client.module";
import { BetaComponent } from "./beta.component";
import { TranslateModule } from "@ngx-translate/core";

@NgModule({
  imports: [
    BrowserModule.withServerTransition({appId: 'angular7-universal-translate'}),
    AppClientModule,
    ShopModule,
    TranslateModule
  ],
  declarations: [AppComponent, BetaComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }