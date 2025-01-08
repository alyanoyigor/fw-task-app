import { getTasksAction } from '@/actions/task.actions';
import TasksHeader from '@/components/tasks/TasksHeader';
import TasksTable from '@/components/tasks/TasksTable';
import { FC } from 'react';

interface TasksPageProps {
  searchParams: Promise<Record<string, never>>;
}

const TasksPage: FC<TasksPageProps> = async ({searchParams}) => {
  const filters = await searchParams;
  const tasks = await getTasksAction(filters);

  return (
    <div className="mt-8">
      <TasksHeader />
      <TasksTable tasks={tasks} />
    </div>
  );
};

export default TasksPage;
