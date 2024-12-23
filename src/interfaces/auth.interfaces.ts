import { AuthKeysEnum } from '@/constants/auth.constants';
import { FieldValues, Path } from 'react-hook-form';

export interface AuthInputInfo<T extends FieldValues> {
  title: string;
  key: Path<T>;
  type: string;
  autoComplete?: string;
}

export interface SignInFormInterface {
  [AuthKeysEnum.EMAIL]: string;
  [AuthKeysEnum.PASSWORD]: string;
}

export interface SignUpFormInterface {
  [AuthKeysEnum.NAME]: string;
  [AuthKeysEnum.EMAIL]: string;
  [AuthKeysEnum.PASSWORD]: string;
  [AuthKeysEnum.PASSWORD_CONFIRM]: string;
}
