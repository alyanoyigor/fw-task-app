import { FieldValues, UseFormRegisterReturn } from 'react-hook-form';

import { cn } from '@/lib/utils';
import { AuthInputInfo } from '@/interfaces/auth.interfaces';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import PasswordInput from '@/components/auth/PasswordInput';

interface AuthInputData<T extends FieldValues> {
  registerData: UseFormRegisterReturn;
  inputInfo: AuthInputInfo<T>;
  error?: string;
};

function AuthInput<T extends FieldValues>({
  error,
  registerData,
  inputInfo,
}: AuthInputData<T>) {
  const { title, key, type, autoComplete } = inputInfo;
  const InputElement = type === 'password' ? PasswordInput : Input;

  return (
    <div className="flex flex-col items-start mb-3">
      <Label htmlFor={key} className="mb-1 text-sm">
        {title}
      </Label>
      <div className="relative w-full">
        <InputElement
          {...registerData}
          placeholder={title}
          type={type}
          className={cn(
            'w-[100%] h-9',
            error && 'border-red-500 focus-visible:ring-red-500'
          )}
          id={key}
          autoComplete={autoComplete || 'off'}
        />
      </div>
      {error && (
        <span className="inline-block text-red-500 text-xs mt-1">{error}</span>
      )}
    </div>
  );
}

export default AuthInput;
