import { ReactNode, useState, useContext, useEffect } from 'react';
import Header from '@/components/header';
import Sidebar from '@/components/sidebar';
import { AuthContext } from '@/components/authorization/use-auth';
import { useRouter } from 'next/router';

type Props = {
  children: ReactNode;
};
export default function AfterLoginLayout({ children }: Props) {
  const { authStatus } = useContext(AuthContext);
  const [display, setDisplay] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    if (!(authStatus === 'auth')) {
      router.push('/login');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Header onDisplay={() => setDisplay(!display)} />
      <div className="main-container">
        <Sidebar onDisplay={(isDisplay) => setDisplay(isDisplay)} isDisplay={display} />
        {children}
      </div>
    </>
  );
}