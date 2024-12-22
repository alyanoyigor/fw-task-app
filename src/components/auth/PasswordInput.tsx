import * as React from 'react';

import { cn } from '@/lib/utils';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Eye, EyeOff } from 'lucide-react';

export interface PasswordInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  containerClassName?: string;
}

const PasswordInput = React.forwardRef<HTMLInputElement, PasswordInputProps>(
  ({ containerClassName, className, ...props }, ref) => {
    const [showPassword, setShowPassword] = React.useState(false);
    const type = showPassword ? 'text' : 'password';

    return (
      <div className={cn('relative w-full', containerClassName)}>
        <Input {...props} className={cn('pr-12', className)} ref={ref} type={type}  />
        <Button
          variant="ghost"
          type="button"
          className="absolute w-12 p-0 h-full right-0 bottom-0 hover:bg-transparent"
          onClick={() => setShowPassword(!showPassword)}
          aria-label="Toggle password visibility"
        >
          {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
        </Button>
      </div>
    );
  },
);
PasswordInput.displayName = 'PasswordInput';

export default PasswordInput;
