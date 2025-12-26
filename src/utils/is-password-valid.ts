import {PASSWORD_PATTERN} from '../const.ts';

function isPasswordValid(password: string): boolean {
  return PASSWORD_PATTERN.test(password);
}

export default isPasswordValid;
