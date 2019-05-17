import { HttpClient } from '@angular/common/http';
import { TranslateLoader } from '@ngx-translate/core';
import { Observable, of } from 'rxjs';
import { TransferState, makeStateKey } from '@angular/platform-browser';
import { PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformServer } from '@angular/common';
import { tap } from 'rxjs/operators';

/**
 * I load and cache translations
 */
export class TranslateHttpLoader implements TranslateLoader {
  constructor(
    private http: HttpClient,
    private transferState: TransferState,
    @Inject(PLATFORM_ID) private platformId: Object,
    public prefix: string = '/assets/i18n/',
    public suffix: string = '.json',
  ) { }

  /**
   * Gets the translations from server or transferkey
   */
  public getTranslation(lang: string): Observable<Object> {
    // prepare and load translations from already loaded HTML
    const translationKey = makeStateKey<Object>('translation-' + lang);
    if (this.transferState.hasKey(translationKey)) {
      const translations = this.transferState.get<Object>(translationKey, null);
      this.transferState.remove(translationKey);
      return of(translations);
    }

    return this.http.get(`${this.prefix}${lang}${this.suffix}`).pipe(
      tap(translations => {
        // loaded translations, if on server, persist to transferstate for client
        if (isPlatformServer(this.platformId)) {
          this.transferState.set(translationKey, translations);
        }
      })
    );
  }
}
