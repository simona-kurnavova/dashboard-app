import {Component} from '@angular/core';
import {MAPPINGS} from '../../components/main.components/application.component';
import {ApplicationBaseComponent} from '../application-base.component';
import {TranslateApplicationService} from './translate-application.service';
import {AVAILABLE_LANGUAGES, Language} from './languages';

@Component({
  selector: 'translate-application',
  templateUrl: './translate-application.component.html',
  providers: [TranslateApplicationService]
})
export class TranslateApplicationComponent extends ApplicationBaseComponent {
  public availableLanguages: Language[] = AVAILABLE_LANGUAGES;
  public language = {
    from: 'en', to: 'en'
  };
  public text = {
    preTranslation: '',
    postTranslation: ''
  };

  constructor(private translateService: TranslateApplicationService) {
    super();
  }

  translate() {
    const _that = this;
    const callback = (data) => {
      _that.text.postTranslation = '';
      for (let i = 0; i < data['text'].length; i++) {
        _that.text.postTranslation += data['text'][i];
      }
    };
    this.translateService.translate(
      this.text.preTranslation, this.language.from + '-' + this.language.to, callback);
  }
}

MAPPINGS['translate-application'] = TranslateApplicationComponent;
