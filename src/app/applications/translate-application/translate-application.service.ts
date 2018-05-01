import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

/**
 * Service for translate API calls, uses Yandex Translate API
 * Reference: https://translate.yandex.com/developers
 */
@Injectable()
export class TranslateApplicationService {
  /**
   * API key generated at: https://translate.yandex.com/developers/keys
   */
  static KEY = 'trnsl.1.1.20180420T152727Z.e83c5f4cd6ad348d.419a5e5f6d1b54e5d70f4ec0d651ea3e294650da';
  /**
   * URL for translation requests
   */
  static URL = 'https://translate.yandex.net/api/v1.5/tr.json/';

  constructor(private http: HttpClient) {}

  /**
   * Asks API for translation
   */
  translate(text: String, lang: String, callback: (response) => any) {
    const url = TranslateApplicationService.URL + 'translate?'
      + 'key=' + TranslateApplicationService.KEY
      + '&text=' + text
      + '&lang=' + lang;
    this.http.get(url).subscribe(callback,
        err => console.log(err)
    );
   }
}
