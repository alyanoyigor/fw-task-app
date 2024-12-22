'use client';

import React, { FC, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { RoutesEnum } from '@/constants/routes.constants';
import {
  SignInFormValidator,
  SignUpFormValidator,
} from '@/schemas/auth.schemas';

import AuthForm from './AuthForm';
import {
  SignInFormInterface,
  SignUpFormInterface,
} from '@/interfaces/auth.interfaces';
import { signInInputs, signUpInputs } from '@/constants/auth.constants';
import { signInAction, signUpAction } from '@/actions/auth.actions';

interface AuthTabsProps {
  tab: RoutesEnum.SIGN_IN | RoutesEnum.SIGN_UP;
}

const AuthTabs: FC<Readonly<AuthTabsProps>> = ({ tab }) => {
  const [activeTab, setActiveTab] = useState(tab);
  const router = useRouter();

  const {
    register: signUpRegister,
    handleSubmit: handleSignUpSubmit,
    formState: { errors: signUpErrorsForm },
    reset: resetSignUpForm,
    setError: setSignUpError,
  } = useForm<SignUpFormInterface>({
    reValidateMode: 'onSubmit',
    resolver: zodResolver(SignUpFormValidator),
  });

  const {
    register: signInRegister,
    handleSubmit: handleSignInSubmit,
    formState: { errors: signInErrors },
    reset: resetSignInForm,
    setError: setSignInError,
  } = useForm<SignInFormInterface>({
    reValidateMode: 'onSubmit',
    resolver: zodResolver(SignInFormValidator),
  });

  const onTabChange = (tab: RoutesEnum.SIGN_IN | RoutesEnum.SIGN_UP) => {
    setActiveTab(tab);
    router.replace(tab);

    // clear potential errors and values
    resetSignInForm();
    resetSignUpForm();
  };

  const onSubmitSignIn = async (data: SignInFormInterface) => {
    try {
      await signInAction(data);
    } catch (error) {
      setSignInError('root', { message: (error as Error).message });
    }
  };
  const onSubmitSignUp = async (data: SignUpFormInterface) => {
    try {
      await signUpAction(data);
    } catch (error) {
      setSignUpError('root', { message: (error as Error).message });
    }
  };

  return (
    <Tabs
      value={activeTab}
      onValueChange={(value: string) => {
        if (value === RoutesEnum.SIGN_IN || value === RoutesEnum.SIGN_UP) {
          onTabChange(value);
        }
      }}
      defaultValue={RoutesEnum.SIGN_IN}
      className="w-ful max-w-[460px] mt-10 mx-auto"
    >
      <TabsList className="w-full">
        <TabsTrigger value={RoutesEnum.SIGN_IN} className="w-full">
          Sign in
        </TabsTrigger>
        <TabsTrigger value={RoutesEnum.SIGN_UP} className="w-full">
          Sign up
        </TabsTrigger>
      </TabsList>
      <TabsContent value={RoutesEnum.SIGN_IN}>
        <AuthForm
          title="Sign In"
          errors={signInErrors}
          register={signInRegister}
          onSubmit={handleSignInSubmit(onSubmitSignIn)}
          inputs={signInInputs}
        />
      </TabsContent>
      <TabsContent value={RoutesEnum.SIGN_UP}>
        <AuthForm
          title="Sign Up"
          errors={signUpErrorsForm}
          register={signUpRegister}
          onSubmit={handleSignUpSubmit(onSubmitSignUp)}
          inputs={signUpInputs}
        />
      </TabsContent>
    </Tabs>
  );
};

export default AuthTabs;
