import {AlertInterface} from '../../authentication-alerts';

export const SUCCESS_CREATING_PAGE_ALERT = <AlertInterface>{
  id: 100,
  type: 'success',
  message: 'Successfully created page'
};

export const SUCCESS_EDITING_PAGE_ALERT = <AlertInterface>{
  id: 101,
  type: 'success',
  message: 'Successfully edited page'
};

export const SUCCESS_DELETING_PAGE_ALERT = <AlertInterface>{
  id: 102,
  type: 'success',
  message: 'Successfully deleted page'
};

export const SUCCESS_CREATING_SECTION_ALERT = <AlertInterface>{
  id: 103,
  type: 'success',
  message: 'Successfully created section'
};

export const SUCCESS_CREATING_NOTEBOOK_ALERT = <AlertInterface>{
  id: 104,
  type: 'success',
  message: 'Successfully created notebook'
};
