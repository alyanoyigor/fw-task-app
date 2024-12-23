'use client';

import { FC, useState } from 'react';
import { Ellipsis } from 'lucide-react';

import { deleteTaskAction, updateTaskAction } from '@/actions/task.actions';
import { TaskInterface } from '@/interfaces/task.interfaces';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import TaskDialog from '@/components/tasks/TaskDialog';

import TaskAlertDialog from './TaskAlertDialog';
import TaskForm from './TaskForm';

interface TaskMenuProps {
  task: TaskInterface;
}

const TaskMenu: FC<TaskMenuProps> = ({ task }: { task: TaskInterface }) => {
  const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost">
            <Ellipsis />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem onClick={() => setOpenEdit(true)}>
            Edit
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setOpenDelete(true)}>Delete</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <TaskDialog
        open={openEdit}
        onOpenChange={setOpenEdit}
        title="Edit Task"
      >
        <TaskForm
          action={updateTaskAction.bind(null, task.id)}
          onCloseDialog={() => setOpenEdit(false)}
          defaultTaskValues={task}
        />
      </TaskDialog>
      <TaskAlertDialog
        open={openDelete}
        setOpen={setOpenDelete}
        action={deleteTaskAction.bind(null, task.id)}
      >
        This action cannot be undone. This will permanently delete your task
        &quot;{task.title}&quot; and it&apos;s data from our servers.
      </TaskAlertDialog>
    </>
  );
};

export default TaskMenu;
