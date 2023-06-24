import { validate as uuidValidate } from 'uuid';
import * as enLanguage from './language/en.json';
import * as itLanguage from './language/it.json';

export class TranslatorResponseSerializer {
  lang = '';

  run(lang, entity) {
    this.lang = lang;
    this.filterObject(entity);
  }

  private filterObject(obj) {
    for (let i in obj) {
      if (!obj.hasOwnProperty(i)) continue;
      if (typeof obj[i] == 'object') {
        this.filterObject(obj[i]);
      } else {
        if (obj[i]) {
          if (typeof obj[i] === 'string') {
            const [prefix, uuid] = obj[i].split('language_');
            if (uuidValidate(uuid)) {
              obj[i] = this.translate(obj[i], this.lang);
            }
          }

          // obj[key] = this.translate(obj[key], this.lang);
        }
      }
    }
    return obj;
  }

  private translate(value: string, lang: string) {
    const english = enLanguage;
    const italian = itLanguage;

    let result = english?.[value];
    result = lang === 'it' ? italian?.[value] : result;
    return result || value;
  }
}
