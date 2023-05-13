import { useRouter } from 'next/router';
import BeforeLoginLayout from '@/components/layout/before-login';
import AfterLoginLayout from '@/components/layout/after-login';

export type LayoutProps = {
  children: React.ReactNode;
};

const Layouts: React.FC<LayoutProps> = ({ children }) => {
  const router = useRouter();
  const { pathname } = router;
  switch (pathname) {
    case '/sign-up':
    case '/login':
    case '/forgot-password':
    case '/set-new-password':
    case '/confirm-sign-up':
      return <BeforeLoginLayout>{children}</BeforeLoginLayout>;
    case '/home':
    case '/change-email':
    case '/confirm-change-email':
    case '/change-password':
      return <AfterLoginLayout>{children}</AfterLoginLayout>;
    default:
      return <>{children}</>;
  }
};

export default Layouts;