import { AlertCircle } from 'lucide-react';
import React, { FC } from 'react';
import { Button } from './ui/button';

interface FetchErrorMessageProps {
  reset: () => void
}

const FetchErrorMessage: FC<FetchErrorMessageProps> = ({ reset }) => {
  return (
    <div className="bg-red-50 border-l-4 border-red-400 p-4 rounded-md shadow-md max-w-md w-full">
      <div className="flex items-center">
        <AlertCircle className="h-6 w-6 text-red-400 mr-3" />
        <div>
          <h3 className="text-lg font-medium text-red-800">Error</h3>
          <p className="text-sm text-red-700 mt-1">
            There was a problem fetching the tasks. Please try again.
          </p>
        </div>
      </div>
      <Button
        onClick={reset}
        variant="outline"
        className="mt-4 w-full bg-white hover:bg-red-50 text-red-600 border-red-300"
      >
        Try again
      </Button>
    </div>
  );
};

export default FetchErrorMessage;
