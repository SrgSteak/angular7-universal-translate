import { NgModule } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
import { HttpClientModule, HttpClient } from "@angular/common/http";
import { LocalizeRouterModule, LocalizeParser, LocalizeRouterSettings, ManualParserLoader } from "@gilsdav/ngx-translate-router";
import { Routes, RouterModule } from "@angular/router";
import { ListComponent } from "./pages/shop/list/list.component";
import { Location } from '@angular/common';
import { BetaComponent } from "./beta.component";

// export function createTranslateLoader(translate: TranslateService, location: Location, settings: LocalizeRouterSettings) {
//   return new ManualParserLoader(translate, location, settings, ['en', 'de'], 'ROUTES.');
// }

export class LocalizeUniversalLoader extends LocalizeParser {

  private httpClient: HttpClient;

  constructor(translate: TranslateService, location: Location, settings: LocalizeRouterSettings, httpClient: HttpClient) {
    super(translate, location, settings);
    this.httpClient = httpClient;
  }
  /**
   * Gets config from the server
   * @param routes
   */
  public load(routes: Routes): Promise<any> {
    return new Promise((resolve: any) => {
      let data = this.httpClient.get<{ locales: Array<string>, prefix: string}>("http://localhost:4000/assets/locales.json").subscribe(
        data => {
          this.locales = data.locales;
          this.prefix = data.prefix;
          this.init(routes).then(resolve);
        }
      );
    });
  }
}

export function localizeLoaderFactory(translate: TranslateService, location: Location, settings: LocalizeRouterSettings, httpClient: HttpClient) {
  return new LocalizeUniversalLoader(translate, location, settings, httpClient);
}

export const routes: Routes = [
  {
    path: '',
    component: ListComponent
  },
  {
    path: 'list/:country/:province/:town',
    component: ListComponent
  },
  {
    path: 'beta',
    component: BetaComponent
  }
];

@NgModule({
  imports: [
    HttpClientModule,
    LocalizeRouterModule.forRoot(routes, {
      parser: {
        provide: LocalizeParser,
        useFactory: localizeLoaderFactory,
        deps: [TranslateService, Location, LocalizeRouterSettings, HttpClient]
      }
    }),
    RouterModule.forRoot(routes)
  ],
  exports: [ RouterModule, LocalizeRouterModule ]
})
export class AppClientModule {}