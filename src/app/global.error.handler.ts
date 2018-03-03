import {ErrorHandler, Injectable, Injector} from '@angular/core';


@Injectable()
export class GlobalErrorHandler implements ErrorHandler {
  constructor(private injector: Injector) {}

  handleError(error) {
    const message: String = error.message.toString();
    console.log(error);
    // throw error;
  }
}
