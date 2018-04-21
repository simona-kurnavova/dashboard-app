import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class TranslateApplicationService {
  static KEY = 'trnsl.1.1.20180420T152727Z.e83c5f4cd6ad348d.419a5e5f6d1b54e5d70f4ec0d651ea3e294650da';
  static URL = 'https://translate.yandex.net/api/v1.5/tr.json/';

  constructor(private http: HttpClient) {}

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
