import AuthTabs from '@/components/auth/AuthTabs';
import { RoutesEnum } from '@/constants/routes.constants';

const SignUpPage = () => {
  return <AuthTabs tab={RoutesEnum.SIGN_UP} />;
};

export default SignUpPage;
