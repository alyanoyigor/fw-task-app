import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Mail } from 'lucide-react';

const AuthEmailStatus = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="flex items-center justify-center text-2xl font-semibold text-gray-800">
            <Mail className="mr-2 h-6 w-6" />
            Email Sent
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-center text-gray-600">
            Please follow the link sent to your email
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default AuthEmailStatus;
