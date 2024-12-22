import { FC, useState } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { format } from 'date-fns';
import { CalendarIcon, Check } from 'lucide-react';

import { cn } from '@/lib/utils';
import { TaskFiltersInterface } from '@/interfaces/task.interfaces';

import { Form, FormControl, FormField, FormItem, FormLabel } from '../ui/form';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { Button } from '../ui/button';
import { Calendar } from '../ui/calendar';
import { RoutesEnum } from '@/constants/routes.constants';
import { TaskFiltersSchema } from '@/schemas/task.schemas';

interface TaskFiltersProps {
  onCloseDialog: () => void;
}

const TaskFilters: FC<TaskFiltersProps> = ({ onCloseDialog }) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const [calendarOpen, setCalendarOpen] = useState(false);
  const {data: defaultValues} = TaskFiltersSchema.safeParse({
      priority: searchParams.get('priority') || 'all',
      status: searchParams.get('status') || 'all',
      deadline: searchParams.get('deadline') || undefined,
      sort: searchParams.get('sort') || 'none',
  });

  const form = useForm<TaskFiltersInterface>({
    defaultValues,
  });

  const onSubmit = (data: TaskFiltersInterface) => {
    updateSearchQuery({
      ...data,
      deadline: data.deadline && format(data.deadline, 'yyyy-MM-dd'),
    });
    onCloseDialog();
  };

  const onReset = () => {
    router.push(RoutesEnum.TASKS);
    onCloseDialog();
  };

  const updateSearchQuery = (updatedQuery: Partial<TaskFiltersInterface>) => {
    const params = new URLSearchParams(searchParams);
    Object.keys(updatedQuery).forEach((key) => {
      const value = updatedQuery[key as keyof typeof updatedQuery];
      if (value && !['none', 'all'].includes(value as string)) {
        params.set(key, value as string);
      } else {
        params.delete(key);
      }
    });
    const queryString = params.toString();
    const updatedPath = queryString ? `${pathname}?${queryString}` : pathname;
    router.push(updatedPath);
  };

  return (
    <Form {...form}>
      <form
        className="flex flex-col gap-4"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <FormField
          control={form.control}
          name="priority"
          render={({ field }) => (
            <FormItem className="space-y-0 grid grid-cols-4 items-center gap-x-4 gap-y-2">
              <FormLabel className="text-right">Priority</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="col-span-3 data-[placeholder]:text-gray-500">
                    <SelectValue placeholder="Select a priority" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="all">All</SelectItem>
                    <SelectItem value="low">Low</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="status"
          render={({ field }) => (
            <FormItem className="space-y-0 grid grid-cols-4 items-center gap-x-4 gap-y-2">
              <FormLabel className="text-right">Status</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="col-span-3 data-[placeholder]:text-gray-500">
                    <SelectValue placeholder="Select a status" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="all">All</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="in-progress">In progress</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="deadline"
          render={({ field }) => (
            <FormItem className="space-y-0 grid grid-cols-4 items-center gap-x-4 gap-y-2">
              <FormLabel className="text-right">Deadline</FormLabel>
              <Popover open={calendarOpen} onOpenChange={setCalendarOpen}>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={'outline'}
                      className={cn(
                        'col-span-3 pl-3',
                        !field.value && 'text-gray-500'
                      )}
                    >
                      {field.value ? (
                        format(field.value, 'PPP')
                      ) : (
                        <span>Pick a date</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent
                  className="w-auto p-0"
                  align="start"
                  hideWhenDetached
                >
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={(value) => {
                      field.onChange(value ?? null);
                      setCalendarOpen(false);
                    }}
                  />
                </PopoverContent>
              </Popover>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="sort"
          render={({ field }) => (
            <FormItem className="space-y-0 grid grid-cols-4 items-center gap-x-4 gap-y-2">
              <FormLabel className="text-right">Sort by</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="col-span-3 data-[placeholder]:text-gray-500">
                    <SelectValue placeholder="Select a status" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="none">None</SelectItem>
                    <SelectItem value="title">Title</SelectItem>
                    <SelectItem value="priority">Priority</SelectItem>
                    <SelectItem value="status">Status</SelectItem>
                    <SelectItem value="deadline">Deadline</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </FormItem>
          )}
        />

        <div className="flex gap-2 justify-end">
          <Button type="button" variant="outline" onClick={onReset}>
            Reset
          </Button>

          <Button type="submit" className="gap-2">
            <Check className="h-4 w-4" />
            Save
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default TaskFilters;
