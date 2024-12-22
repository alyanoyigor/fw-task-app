import { AuthKeysEnum } from '@/constants/auth.constants';
import { z } from 'zod';

export const passwordCreate = z
  .string()
  .min(1, 'This field is required')
  .min(8, 'Must be at least 8 characters in length')
  .regex(
    new RegExp('.*[A-Z].*'),
    'Password should include uppercase character, number and special character'
  )
  .regex(
    new RegExp('.*[a-z].*'),
    'Password should include uppercase character, number and special character'
  )
  .regex(
    new RegExp('.*\\d.*'),
    'Password should include uppercase character, number and special character'
  );

export const validation = {
  [AuthKeysEnum.NAME]: z.string().min(1, 'This field is required'),
  [AuthKeysEnum.EMAIL]: z.string().min(1, 'This field is required').email(),
  passwordCreate: passwordCreate,
  passwordPaste: z.string().min(1, 'This field is required'),
  [AuthKeysEnum.PASSWORD_CONFIRM]: z.string(),
};

export const SignUpFormValidator = z
  .object({
    [AuthKeysEnum.NAME]: validation.name,
    [AuthKeysEnum.EMAIL]: validation.email,
    [AuthKeysEnum.PASSWORD]: validation.passwordCreate,
    [AuthKeysEnum.PASSWORD_CONFIRM]: validation.passwordConfirm,
  })
  .refine(({ password, passwordConfirm }) => password === passwordConfirm, {
    message: "Passwords don't match",
    path: [AuthKeysEnum.PASSWORD_CONFIRM],
  });

export const SignInFormValidator = z.object({
  [AuthKeysEnum.EMAIL]: validation.email,
  [AuthKeysEnum.PASSWORD]: validation.passwordPaste,
});
