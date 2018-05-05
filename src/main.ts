import {enableProdMode, LOCALE_ID, TRANSLATIONS, TRANSLATIONS_FORMAT} from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

declare const require;
const locale = navigator.language;
console.log(locale);

const translations: Map<string, any> = new Map<string, any>();
translations.set('sk', require(`raw-loader!./locale/messages.sk.xlf`));
let providers = [];

if (translations.get(locale.toString())) {
  providers = [
    {provide: TRANSLATIONS, useValue: translations.get(locale.toString()) },
    {provide: TRANSLATIONS_FORMAT, useValue: 'xlf'}
  ];
}

console.log(providers);
platformBrowserDynamic().bootstrapModule(AppModule, {
  providers: providers
});
