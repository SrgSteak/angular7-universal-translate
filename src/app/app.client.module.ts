import { NgModule } from "@angular/core";
import { TranslateModule, TranslateLoader, TranslateService, TranslatePipe } from "@ngx-translate/core";
import { HttpLoaderFactory } from "./app.module";
import { HttpClient, HttpClientModule } from "@angular/common/http";
import { LocalizeRouterModule, LocalizeParser, LocalizeRouterSettings } from "@gilsdav/ngx-translate-router";
import { LocalizeRouterHttpLoader } from "@gilsdav/ngx-translate-router-http-loader";
import { Routes, RouterModule } from "@angular/router";
import { ListComponent } from "./pages/shop/list/list.component";
import { Location } from '@angular/common';
import { BetaComponent } from "./beta.component";

export const routes: Routes = [
  {
    path: 'list',
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
        useFactory: (translate, location, settings, http) =>
            new LocalizeRouterHttpLoader(translate, location, settings, http),
        deps: [TranslateService, Location, LocalizeRouterSettings, HttpClient]
      }
    }),
    RouterModule.forRoot(routes)
  ]
})
export class AppClientModule {}