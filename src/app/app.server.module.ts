import {NgModule} from '@angular/core';
import {ServerModule} from '@angular/platform-server';
import {ModuleMapLoaderModule} from '@nguniversal/module-map-ngfactory-loader';
import {AppComponent} from './app.component';
import {AppModule, HttpLoaderFactory} from './app.module';
import { LocalizeParser, LocalizeRouterSettings, LocalizeRouterModule } from '@gilsdav/ngx-translate-router';
import { Routes } from '@angular/router';
import { TranslateService, TranslateLoader, TranslateModule, TranslatePipe } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import {Location} from '@angular/common';
// this will only work on the server because it is a node.js module.
import * as fs from 'fs-extra';
import { HttpClient } from '@angular/common/http';
import { LocalizeRouterHttpLoader } from '@gilsdav/ngx-translate-router-http-loader';
import { routes } from './app.client.module';

@NgModule({
  imports: [
    AppModule,
    ServerModule,
    ModuleMapLoaderModule,
    TranslateModule.forRoot({
      loader: {
          provide: TranslateLoader,
          useFactory: translateLoaderFactory,
      }
    }),
    LocalizeRouterModule.forRoot(routes, {
      parser: {
        provide: LocalizeParser,
        useFactory: localizeLoaderFactory,
        deps: [TranslateService, Location, LocalizeRouterSettings]
      }
    })
  ],
  bootstrap: [AppComponent],
  exports: [
    TranslatePipe
  ]
})
export class AppServerModule {
}


/**
 * FOR NGX-TRANSLATE-ROUTER
 */
export class LocalizeUniversalLoader extends LocalizeParser {
  /**
   * Gets config from the server
   * @param routes
   */
  public load(routes: Routes): Promise<any> {
    return new Promise((resolve: any) => {
      // let data: any = JSON.parse(fs.readFileSync(`assets/locales.json`, 'utf8'));
      this.locales = ['de', 'en', 'it', 'fr'] // data.locales;
      this.prefix = "ROUTES." // data.prefix;
      this.init(routes).then(resolve);
    });
  }
}

export function localizeLoaderFactory(translate: TranslateService, location: Location, settings: LocalizeRouterSettings) {
  return new LocalizeUniversalLoader(translate, location, settings);
}

/**
 * FOR NGX-TRANSLATE
 */
export class TranslateUniversalLoader implements TranslateLoader {
  /**
   * Gets the translations from the server
   * @param lang
   * @returns {any}
   */
  public getTranslation(lang: string): Observable<any> {
    return Observable.create(observer => {
      observer.next(JSON.parse(fs.readFileSync(`src/assets/i18n/${lang}.json`, 'utf8')));
      observer.complete();
    });
  }
}
export function translateLoaderFactory() {
  return new TranslateUniversalLoader();
}