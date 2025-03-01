'use server';

import { revalidatePath } from 'next/cache';

import { BaseTaskInterface, TaskInterface } from '@/interfaces/task.interfaces';
import { createClient } from '@/lib/supabase/server';
import { TaskFiltersSchema } from '@/schemas/task.schemas';
import { TaskKeysEnum } from '@/constants/task.constants';
import { RoutesEnum } from '@/constants/routes.constants';

export const getTasksAction = async (
  params?: Record<string, never>
): Promise<TaskInterface[]> => {
  const { error: validationError, data: validatedParams } =
    TaskFiltersSchema.safeParse(params);

  if (validationError) {
    throw new Error('Invalid params or values');
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    throw new Error('User not found');
  }

  let query = supabase
    .from('tasks')
    .select()
    .order(validatedParams?.sort || 'created_at')
    .eq(TaskKeysEnum.USER_ID, user.id);

  Object.entries(validatedParams).forEach(([key, value]) => {
    console.log(key, value);
    if (key !== TaskKeysEnum.SORT) {
      query = query.eq(key, value);
    }
  });

  const { data, error } = await query;

  if (error) {
    throw new Error(error.message);
  }

  return data;
};

export const createTaskAction = async (task: BaseTaskInterface) => {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    throw new Error('User not found');
  }

  const { error } = await supabase
    .from('tasks')
    .insert({ ...task, user_id: user.id });

  if (error) {
    return { message: error.message };
  }

  revalidatePath(RoutesEnum.TASKS);
};

export const deleteTaskAction = async (id: number) => {
  const supabase = await createClient();

  const { error } = await supabase.from('tasks').delete().eq('id', id);

  if (error) {
    return { message: error.message };
  }

  revalidatePath(RoutesEnum.TASKS);
};

export const updateTaskAction = async (
  id: number,
  taskPart: Partial<BaseTaskInterface>
) => {
  const supabase = await createClient();

  const { error } = await supabase.from('tasks').update(taskPart).eq('id', id);

  if (error) {
    return { message: error.message };
  }

  revalidatePath(RoutesEnum.TASKS);
};
