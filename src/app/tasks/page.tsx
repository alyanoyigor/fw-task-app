import TasksHeader from '@/components/tasks/TasksHeader';
import TasksTable from '@/components/tasks/TasksTable';
import { FC } from 'react';

interface TasksPageProps {
  searchParams: Promise<Record<string, never>>;
}

const TasksPage: FC<TasksPageProps> = async ({searchParams}) => {
  const filters = await searchParams;

  return (
    <div className="mt-8">
      <TasksHeader />
      <TasksTable filters={filters} />
    </div>
  );
};

export default TasksPage;
