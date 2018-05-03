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
  message: 'Username can\'t be empty'
};

export const EMPTY_PASSWORD_ALERT: AlertInterface = {
  id: 2,
  type: 'warning',
  message: 'Password can\'t be empty'
};

export const INCORRECT_CREDENTIALS: AlertInterface = {
  id: 3,
  type: 'danger',
  message: 'Incorrect credentials'
};

export const SERVER_ERROR_ALERT: AlertInterface = {
  id: 4,
  type: 'danger',
  message: 'Connection error'
};

export const USER_REGISTERED_ALERT: AlertInterface = {
  id: 5,
  type: 'success',
  message: 'Registration successful'
};

export const USER_ALREADY_EXISTS_ALERT: AlertInterface = {
  id: 6,
  type: 'warning',
  message: 'Username already registered'
};

export const USER_EDITED_ALERT: AlertInterface = {
  id: 7,
  type: 'success',
  message: 'User successfully edited'
};

export const ACCOUNT_ADDED_ALERT: AlertInterface = {
  id: 8,
  type: 'success',
  message: 'Account successfully added'
};

export const ACCOUNT_DELETED_ALERT: AlertInterface = {
  id: 9,
  type: 'success',
  message: 'Account successfully deleted'
};

export const ERROR_DELETING_ACCOUNT_ALERT: AlertInterface = {
  id: 10,
  type: 'danger',
  message: 'Error while trying to delete account'
};

export const EVENT_ADDED_ALERT: AlertInterface = {
  id: 11,
  type: 'success',
  message: 'Event successfully created'
};

export const EVENT_ADD_ERROR_ALERT: AlertInterface = {
  id: 12,
  type: 'danger',
  message: 'Error creating event'
};

export const EVENT_EDITED_ALERT: AlertInterface = {
  id: 13,
  type: 'success',
  message: 'Event successfully edited'
};

export const EVENT_EDIT_ERROR_ALERT: AlertInterface = {
  id: 14,
  type: 'danger',
  message: 'Error editing event'
};

export const ADD_WIDGET_ERROR_ALERT: AlertInterface = {
  id: 15,
  type: 'danger',
  message: 'Error adding widget to dashboard'
};
