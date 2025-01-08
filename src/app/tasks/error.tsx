'use client';

import { FC } from 'react';
import FetchErrorMessage from '@/components/FetchErrorMessage';

interface ErrorTasksProps {
  reset: () => void;
}

const ErrorTasks: FC<ErrorTasksProps> = ({ reset }) => {
  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-4rem)]">
      <FetchErrorMessage reset={reset} />
    </div>
  );
};

export default ErrorTasks;
