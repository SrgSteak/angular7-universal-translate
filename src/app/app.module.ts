import {BrowserModule} from "@angular/platform-browser";
import {NgModule} from '@angular/core';
import { HttpClient} from '@angular/common/http';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import { AppComponent } from './app.component';
import { ShopModule } from './pages/shop/shop.module';
import { AppClientModule, routes } from "./app.client.module";

// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient) {
    return new TranslateHttpLoader(http);
}

@NgModule({
  imports: [
    BrowserModule.withServerTransition({appId: 'angular7-universal-translate'}),
    AppClientModule,
    ShopModule
  ],
  declarations: [AppComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }