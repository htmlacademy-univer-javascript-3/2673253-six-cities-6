import {store} from '../store';
import {clearErrorAction} from '../store/api-actions';
import {setErrorAction} from '../store/actions.ts';

export const processErrorHandle = (message: string): void => {
  store.dispatch(setErrorAction(message));
  store.dispatch(clearErrorAction());
};
