import {Component} from '@angular/core';
import {MAPPINGS} from '../../components/main.components/application.component';
import {ApplicationBaseComponent} from '../../components/main.components/application-base.component';
import {TranslateApplicationService} from './translate-application.service';
import {AVAILABLE_LANGUAGES, Language} from './languages';

/**
 * Implementation of Translate application
 */

@Component({
  selector: 'translate-application',
  templateUrl: './translate-application.component.html',
  providers: [TranslateApplicationService]
})
export class TranslateApplicationComponent extends ApplicationBaseComponent {
  /**
   * Available languages for translation
   */
  public availableLanguages: Language[] = AVAILABLE_LANGUAGES;
  /**
   * Default languages defined for selectbox
   */
  public language = {
    from: 'en', to: 'en'
  };
  /**
   * Text for translation and translated
   */
  public text = {
    preTranslation: '',
    postTranslation: ''
  };

  constructor(private translateService: TranslateApplicationService) {
    super();
  }

  /**
   * Translates text
   */
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
