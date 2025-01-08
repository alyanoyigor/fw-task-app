'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

import {
  SignInFormInterface,
  SignUpFormInterface,
} from '@/interfaces/auth.interfaces';
import { createClient } from '@/lib/supabase/server';
import { RoutesEnum } from '@/constants/routes.constants';

export async function signInAction(data: SignInFormInterface) {
  const supabase = await createClient();

  const { error } = await supabase.auth.signInWithPassword({
    email: data.email,
    password: data.password,
  });

  if (error) {
    return { message: error.message };
  }

  revalidatePath(RoutesEnum.TASKS);
  redirect(RoutesEnum.TASKS);
}

export async function signUpAction(data: SignUpFormInterface) {
  const supabase = await createClient();

  const { error } = await supabase.auth.signUp({
    email: data.email,
    password: data.password,
    options: {
      data: {
        first_name: data.name,
      },
    },
  });

  if (error) {
    return { message: error.message };
  }

  // revalidatePath(RoutesEnum.EMAIL_STATUS);
  // redirect(RoutesEnum.EMAIL_STATUS);

  return signInAction({ email: data.email, password: data.password });
}

export async function signOutAction() {
  const supabase = await createClient();
  await supabase.auth.signOut();

  revalidatePath(RoutesEnum.BASE, 'layout');
  redirect(RoutesEnum.BASE);
}
