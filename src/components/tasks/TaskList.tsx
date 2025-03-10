import { format } from 'date-fns';

import { TaskInterface } from '@/interfaces/task.interfaces';
import TaskMenu from '@/components/tasks/TaskMenu';
import { TableCell, TableRow } from '@/components/ui/table';

interface TaskListProps {
  tasks: TaskInterface[];
}

async function TaskList({ tasks }: TaskListProps) {

  if (!tasks.length) {
    return (
      <TableRow>
        <TableCell colSpan={6}>No tasks found</TableCell>
      </TableRow>
    );
  }

  return tasks.map((task: TaskInterface) => (
    <TableRow key={task.id}>
      <TableCell className="font-medium">{task.title}</TableCell>
      <TableCell>{task.description}</TableCell>
      <TableCell>{task.priority}</TableCell>
      <TableCell>{task.status}</TableCell>
      <TableCell>{format(new Date(task.deadline), 'dd/MM/yyyy')}</TableCell>
      <TableCell className="w-[1%] p-0 pr-4 text-right">
        <TaskMenu task={task} />
      </TableCell>
    </TableRow>
  ));
}

export default TaskList;
