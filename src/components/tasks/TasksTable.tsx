import { FC, Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';

import TaskList from '@/components/tasks/TaskList';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

interface TasksTableProps {
  filters: Record<string, never>;
}

const TasksTable: FC<TasksTableProps> = ({ filters }) => {
  return (
    <Table>
      <TableCaption className="hidden">A list of tasks.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Title</TableHead>
          <TableHead>Description</TableHead>
          <TableHead>Priority</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Deadline</TableHead>
          <TableHead></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <ErrorBoundary
          fallback={
            <TableRow>
              <TableCell>Something went wrong</TableCell>
            </TableRow>
          }
        >
          <Suspense
            fallback={
              <TableRow>
                <TableCell>Loading...</TableCell>
              </TableRow>
            }
          >
            <TaskList filters={filters} />
          </Suspense>
        </ErrorBoundary>
      </TableBody>
    </Table>
  );
};

export default TasksTable;
