import { BrowserModule, BrowserTransferStateModule, TransferState } from "@angular/platform-browser";
import { NgModule, PLATFORM_ID } from '@angular/core';
import { AppComponent } from './app.component';
import { ShopModule } from './pages/shop/shop.module';
import { AppClientModule, routes } from "./app.client.module";
import { BetaComponent } from "./beta.component";
import { TranslateModule, TranslateLoader } from "@ngx-translate/core";
import { HttpClient } from "@angular/common/http";

// i am the custom TranslateHttpLoader to leverage SSR
import { TranslateHttpLoader } from "./ssr/TranslateHttpLoader";
import { isPlatformBrowser } from '@angular/common';

/**
 *
 * @param http the client to load json from server
 * @param transferstate the handle to "cache" info from ssr in html
 * @param platformId the platform to differentiate between server/client
 */
export function createTranslateLoader(http: HttpClient, transferstate: TransferState, platformId: Object) {
  /**
   * Protip: use the if(isPlatformServer(platformId)) {} else {}
   * if you want to load your translations differently on server/client
   */
  if (isPlatformBrowser(platformId)) {

    return new TranslateHttpLoader(http, transferstate, platformId, `http://localhost:4200/assets/i18n/`, '.json');
  } else {

    return new TranslateHttpLoader(http, transferstate, platformId, `http://localhost:4000/assets/i18n/`, '.json');
  }

}

@NgModule({
  imports: [
    // i am important for SSR ------
    BrowserModule.withServerTransition({ appId: 'angular7-universal-translate' }),
    BrowserTransferStateModule,
    // -----------------------------
    AppClientModule,
    ShopModule,
    // i am custom to extend the TranslateLoader for SSR and caching
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient, TransferState, PLATFORM_ID]
      }
    })
  ],
  declarations: [AppComponent, BetaComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }