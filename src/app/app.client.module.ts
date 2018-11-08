import { NgModule } from "@angular/core";
import { TranslateModule, TranslateLoader, TranslateService, TranslatePipe } from "@ngx-translate/core";
import { HttpClient, HttpClientModule } from "@angular/common/http";
import { LocalizeRouterModule, LocalizeParser, LocalizeRouterSettings, ManualParserLoader } from "@gilsdav/ngx-translate-router";
import { LocalizeRouterHttpLoader } from "@gilsdav/ngx-translate-router-http-loader";
import { Routes, RouterModule } from "@angular/router";
import { ListComponent } from "./pages/shop/list/list.component";
import { Location } from '@angular/common';
import { BetaComponent } from "./beta.component";
import {TranslateHttpLoader} from '@ngx-translate/http-loader';

// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

export function createTranslateLoader(translate: TranslateService, location: Location, settings: LocalizeRouterSettings) {
  return new ManualParserLoader(translate, location, settings, ['en', 'de'], 'ROUTES.');
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
    TranslateModule.forRoot({
      loader: {
          provide: TranslateLoader,
          useFactory: HttpLoaderFactory,
          deps: [HttpClient]
      }
    }),
    LocalizeRouterModule.forRoot(routes, {
      parser: {
        provide: LocalizeParser,
        useFactory: (createTranslateLoader),
        deps: [TranslateService, Location, LocalizeRouterSettings]
      }
    }),
    RouterModule.forRoot(routes)
  ],
  exports: [ RouterModule, LocalizeRouterModule ]
})
export class AppClientModule {}