import AuthTabs from '@/components/auth/AuthTabs';
import { RoutesEnum } from '@/constants/routes.constants';

const SignInPage = () => {
  return <AuthTabs tab={RoutesEnum.SIGN_IN} />;
};

export default SignInPage;
