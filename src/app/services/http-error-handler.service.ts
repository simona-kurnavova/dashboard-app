import {Injectable} from '@angular/core';
import {AlertInterface, INCORRECT_CREDENTIALS, SERVER_ERROR_ALERT, USER_ALREADY_EXISTS_ALERT } from '../alert-definitions';

const statusMap: Map<Number, AlertInterface> = new Map([
  [0, SERVER_ERROR_ALERT],
  [401, INCORRECT_CREDENTIALS],
  [400, USER_ALREADY_EXISTS_ALERT],
]);

@Injectable()
export class HttpErrorHandler {

  static getAlert(status: Number) {
    return statusMap.get(status);
  }
}
