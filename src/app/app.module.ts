import {BrowserModule} from "@angular/platform-browser";
import {NgModule} from '@angular/core';
import {Location} from '@angular/common';
import {HttpClientModule, HttpClient} from '@angular/common/http';
import {TranslateModule, TranslateService, TranslateLoader } from '@ngx-translate/core';
import {LocalizeRouterModule, LocalizeParser, LocalizeRouterSettings } from '@gilsdav/ngx-translate-router';
import {LocalizeRouterHttpLoader} from '@gilsdav/ngx-translate-router-http-loader';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {RouterModule} from '@angular/router';
import { AppComponent } from './app.component';
import { ShopModule } from './pages/shop/shop.module';
import { ListComponent } from './pages/shop/list/list.component';

const routes = [
  {path: 'list/:country/:province/:town', component: ListComponent}
];

// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient) {
    return new TranslateHttpLoader(http);
}

@NgModule({
  imports: [
    BrowserModule.withServerTransition({appId: 'angular7-universal-translate'}),
    HttpClientModule,
    TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: HttpLoaderFactory,
                deps: [HttpClient]
            }
        }),
    // LocalizeRouterModule.forRoot(routes, {
    //   parser: {
    //     provide: LocalizeParser,
    //     useFactory: (translate, location, settings, http) =>
    //         new LocalizeRouterHttpLoader(translate, location, settings, http),
    //     deps: [TranslateService, Location, LocalizeRouterSettings, HttpClient]
    //   }
    // }),
    RouterModule.forRoot(routes),
    ShopModule,
  ],
  declarations: [AppComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
