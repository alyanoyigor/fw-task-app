import {
  AuthInputInfo,
  SignInFormInterface,
  SignUpFormInterface,
} from '@/interfaces/auth.interfaces';

export const signUpInputs: AuthInputInfo<SignUpFormInterface>[] = [
  { title: 'Name', key: 'name', type: 'text' },
  { title: 'Email', key: 'email', type: 'email' },
  {
    title: 'Password',
    key: 'password',
    type: 'password',
    autoComplete: 'new-password',
  },
  {
    title: 'Confirm Password',
    key: 'passwordConfirm',
    type: 'password',
    autoComplete: 'new-password',
  },
];

export const signInInputs: AuthInputInfo<SignInFormInterface>[] = [
  { title: 'Email', key: 'email', type: 'email' },
  {
    title: 'Password',
    key: 'password',
    type: 'password',
    autoComplete: 'current-password',
  },
];

export enum AuthKeysEnum {
  NAME = 'name',
  EMAIL = 'email',
  PASSWORD = 'password',
  PASSWORD_CONFIRM = 'passwordConfirm',
}
