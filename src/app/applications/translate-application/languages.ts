/**
 * Definition of Language object for storing available languages for translation
 * Hard coded for the reasons of unreasonable API response
 */
export interface Language {
  name: string;
  id: String;
}

/**
 * Definitions of available languages for translation
 */
export const AVAILABLE_LANGUAGES = <Language[]> [
  {name: 'English', id: 'en'},
  {name: 'Azerbaijani', id: 'az'},
  {name: 'Belarusian', id: 'be'},
  {name: 'Bulgarian', id: 'bg'},
  {name: 'Catalan', id: 'ca'},
  {name: 'Czech', id: 'cs'},
  {name: 'Danish', id: 'da'},
  {name: 'German', id: 'de'},
  {name: 'Greek', id: 'el'},
  {name: 'Spanish', id: 'es'},
  {name: 'Estonian', id: 'et'},
  {name: 'Finnish', id: 'fi'},
  {name: 'French', id: 'fr'},
  {name: 'Croatian', id: 'hr'},
  {name: 'Hungarian', id: 'hu'},
  {name: 'Armenian', id: 'hy'},
  {name: 'Italian', id: 'it'},
  {name: 'Lithuanian', id: 'lt'},
  {name: 'Latvian', id: 'lv'},
  {name: 'Macedonian', id: 'mk'},
  {name: 'Dutch', id: 'nl'},
  {name: 'Norwegian', id: 'no'},
  {name: 'Polish', id: 'pl'},
  {name: 'Portuguese', id: 'pt'},
  {name: 'Romanian', id: 'ro'},
  {name: 'Russian', id: 'ru'},
  {name: 'Slovak', id: 'sk'},
  {name: 'Slovenian', id: 'sl'},
  {name: 'Albanian', id: 'sq'},
  {name: 'Serbian', id: 'sr'},
  {name: 'Swedish', id: 'sv'},
  {name: 'Turkish', id: 'tr'},
  {name: 'Ukrainian', id: 'uk'}
  ];
