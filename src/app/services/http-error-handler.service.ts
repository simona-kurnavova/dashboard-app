import { Injectable } from '@angular/core';
import {AlertInterface, INCORRECT_CREDENTIALS, SERVER_ERROR_ALERT} from '../authentication-alerts';

const statusMap: Map<Number, AlertInterface> = new Map([
  [0, SERVER_ERROR_ALERT],
  [401, INCORRECT_CREDENTIALS],
]);

@Injectable()
export class HttpErrorHandler {

  static getAlert(status: Number) {
    return statusMap.get(status);
  }
}
