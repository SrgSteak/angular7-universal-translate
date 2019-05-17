import { NgModule, PLATFORM_ID } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
import { HttpClientModule, HttpClient } from "@angular/common/http";
import { LocalizeRouterModule, LocalizeParser, LocalizeRouterSettings } from "@gilsdav/ngx-translate-router";
import { Routes, RouterModule } from "@angular/router";
import { ListComponent } from "./pages/shop/list/list.component";
import { Location, isPlatformServer } from '@angular/common';
import { BetaComponent } from "./beta.component";
import { TransferState, makeStateKey } from '@angular/platform-browser';

/**
 * I load and cache "what" locales are available and where translateable routes can be found
 */
export class LocalizeUniversalLoader extends LocalizeParser {

  constructor(
    translate: TranslateService,
    location: Location,
    settings: LocalizeRouterSettings,
    private httpClient: HttpClient,
    private platformId: Object,
    private transferState: TransferState
  ) {
    super(translate, location, settings);
    /**
     * if you want to load different files,
     * etc depending on the platform (server/client),
     * do it here or in the load function
     */
  }
  /**
   * Gets config from the server
   * @param routes
   */
  public load(routes: Routes): Promise<any> {
    return new Promise((resolve: any) => {
      const routesKey = makeStateKey<{ locales: Array<string>, prefix: string }>('routes');
      if (this.transferState.hasKey(routesKey)) {
        const data = this.transferState.get<{ locales: Array<string>, prefix: string }>(routesKey, null);
        this.transferState.remove(routesKey);
        this.locales = data.locales;
        this.prefix = data.prefix;
        this.init(routes).then(resolve);
      } else {
        this.httpClient
          .get<{ locales: Array<string>, prefix: string }>("http://localhost:4000/assets/locales.json")
          .subscribe(
            data => {
              if (isPlatformServer(this.platformId)) {
                this.transferState.set<{ locales: Array<string>, prefix: string }>(routesKey, data);
              }
              this.locales = data.locales;
              this.prefix = data.prefix;
              this.init(routes).then(resolve);
            }
          );
      }
    });
  }
}

/**
 * I am the factory for the angular dependency loader
 * @param translate
 * @param location
 * @param settings
 * @param httpClient
 * @param platformId
 * @param transferState
 */
export function localizeLoaderFactory(
  translate: TranslateService,
  location: Location,
  settings: LocalizeRouterSettings,
  httpClient: HttpClient,
  platformId: Object,
  transferState: TransferState) {
  return new LocalizeUniversalLoader(translate, location, settings, httpClient, platformId, transferState);
}

export const routes: Routes = [
  // Some random default components to switch
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
  },
  {
    // this is a lazy loaded module. The components will only load if you surf to the routes.
    path: 'school',
    loadChildren: './pages/school/school.module#SchoolModule'
  }
];

@NgModule({
  imports: [
    HttpClientModule,
    // i am the custom parser for routes
    LocalizeRouterModule.forRoot(routes, {
      parser: {
        provide: LocalizeParser,
        useFactory: localizeLoaderFactory,
        deps: [TranslateService, Location, LocalizeRouterSettings, HttpClient, PLATFORM_ID, TransferState]
      }
    }),
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule, LocalizeRouterModule]
})
export class AppClientModule { }