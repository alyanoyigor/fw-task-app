import { FormEventHandler } from 'react';
import { FieldErrors, FieldValues, UseFormRegister } from 'react-hook-form';
import { Loader2 } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { AuthInputInfo } from '@/interfaces/auth.interfaces';

import AuthInput from './AuthInput';

interface AuthFormType<T extends FieldValues> {
  title: string;
  inputs: AuthInputInfo<T>[];
  errors: FieldErrors;
  register: UseFormRegister<T>;
  onSubmit: FormEventHandler<HTMLFormElement>;
  isSubmitting: boolean;
}

const AuthForm = <T extends FieldValues>({
  title,
  inputs,
  errors,
  register,
  onSubmit,
  isSubmitting,
}: AuthFormType<T>) => {
  return (
    <div className="p-8 bg-white border-gray-200 rounded">
      <h1 className="text-2xl font-bold mb-4">{title}</h1>
      <form onSubmit={onSubmit}>
        {inputs.map((inputInfo: AuthInputInfo<T>) => (
          <AuthInput
            key={inputInfo.key}
            inputInfo={inputInfo}
            error={errors[inputInfo.key]?.message?.toString()}
            registerData={register(inputInfo.key)}
          />
        ))}

        {errors.root && (
          <p className="text-red-500 text-xs mt-1">{errors.root.message}</p>
        )}

        <Button variant="default" className="mt-4" size="lg" type="submit">
          {title}
          {isSubmitting && <Loader2 className="animate-spin" />}
        </Button>
      </form>
    </div>
  );
};

export default AuthForm;
