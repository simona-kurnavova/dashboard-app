/**
 * Definition of AlertInterface providing object for error messages implemented with ng-bootstrap alert
 */
export interface AlertInterface {
  id: number;
  type: string;
  message: string;
}

/**
 * Following are definitions of specific errors for ng-bootrap alerts
 */
export const EMPTY_USERNAME_ALERT: AlertInterface = {
  id: 1,
  type: 'warning',
  message: `<ng-container i18n>Username can't be empty</ng-container>`
};

export const EMPTY_PASSWORD_ALERT: AlertInterface = {
  id: 2,
  type: 'warning',
  message: `<ng-container i18n>Password can\'t be empty</ng-container>`
};

export const INCORRECT_CREDENTIALS: AlertInterface = {
  id: 3,
  type: 'danger',
  message: `<ng-container i18n>Incorrect credentials</ng-container>`
};

export const SERVER_ERROR_ALERT: AlertInterface = {
  id: 4,
  type: 'danger',
  message: `<ng-container i18n>Connection error</ng-container>`
};

export const USER_REGISTERED_ALERT: AlertInterface = {
  id: 5,
  type: 'success',
  message: `<ng-container i18n>Registration successful</ng-container>`
};

export const USER_ALREADY_EXISTS_ALERT: AlertInterface = {
  id: 6,
  type: 'warning',
  message: `<ng-container i18n>Username already registered</ng-container>`
};

export const USER_EDITED_ALERT: AlertInterface = {
  id: 7,
  type: 'success',
  message: `<ng-container i18n>User successfully edited</ng-container>`
};

export const ACCOUNT_ADDED_ALERT: AlertInterface = {
  id: 8,
  type: 'success',
  message: `<ng-container i18n>Account successfully added</ng-container>`
};

export const ACCOUNT_DELETED_ALERT: AlertInterface = {
  id: 9,
  type: 'success',
  message: `<ng-container i18n>Account successfully deleted</ng-container>`
};

export const ERROR_DELETING_ACCOUNT_ALERT: AlertInterface = {
  id: 10,
  type: 'danger',
  message: `<ng-container i18n>Error while trying to delete account</ng-container>`
};

export const EVENT_ADDED_ALERT: AlertInterface = {
  id: 11,
  type: 'success',
  message: `<ng-container i18n>Event successfully created</ng-container>`
};

export const EVENT_ADD_ERROR_ALERT: AlertInterface = {
  id: 12,
  type: 'danger',
  message: `<ng-container i18n>Error creating event</ng-container>`
};

export const EVENT_EDITED_ALERT: AlertInterface = {
  id: 13,
  type: 'success',
  message: `<ng-container i18n>Event successfully edited</ng-container>`
};

export const EVENT_EDIT_ERROR_ALERT: AlertInterface = {
  id: 14,
  type: 'danger',
  message: `<ng-container i18n>Error editing event</ng-container>`
};

export const ADD_WIDGET_ERROR_ALERT: AlertInterface = {
  id: 15,
  type: 'danger',
  message: `<ng-container i18n>Error adding widget to dashboard</ng-container>`
};
