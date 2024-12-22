'use client';

import { useState } from 'react';

import { createTaskAction } from '@/actions/task.actions';

import { Button } from '../ui/button';

import TaskDialog from './TaskDialog';
import TaskForm from './TaskForm';
import TaskFilters from './TaskFilters';

const TasksHeader = () => {
  const [openCreate, setOpenCreate] = useState(false);
  const [openFilters, setOpenFilters] = useState(false);

  return (
    <div className="flex items-center justify-between gap-4 mb-4">
      <h1 className="text-3xl font-bold">Dashboard</h1>

      <div className="flex gap-4">
        <Button
          variant="outline"
          onClick={() => setOpenFilters(true)}
        >
          Settings
        </Button>
        <Button onClick={() => setOpenCreate(true)}>Create Task</Button>
      </div>

      <TaskDialog
        open={openFilters}
        onOpenChange={setOpenFilters}
        title="Filter Tasks"
      >
        <TaskFilters onCloseDialog={() => setOpenFilters(false)} />
      </TaskDialog>

      <TaskDialog
        open={openCreate}
        onOpenChange={setOpenCreate}
        title="Create Task"
      >
        <TaskForm
          action={createTaskAction}
          onCloseDialog={() => setOpenCreate(false)}
        />
      </TaskDialog>
    </div>
  );
};

export default TasksHeader;
