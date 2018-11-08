import { NgModule } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
import { HttpClientModule } from "@angular/common/http";
import { LocalizeRouterModule, LocalizeParser, LocalizeRouterSettings, ManualParserLoader } from "@gilsdav/ngx-translate-router";
import { Routes, RouterModule } from "@angular/router";
import { ListComponent } from "./pages/shop/list/list.component";
import { Location } from '@angular/common';
import { BetaComponent } from "./beta.component";

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