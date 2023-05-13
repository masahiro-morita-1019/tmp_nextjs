import { FC, useContext, useState } from 'react';
import proficon from '@/assets/images/proficon.png';
import { AiOutlineMenu } from 'react-icons/ai';
import { Auth } from 'aws-amplify';
import { AuthContext } from '@/components/authorization/use-auth';
import { useRouter } from 'next/router';

type Props = {
  onDisplay: () => void;
};

const Header: FC<Props> = ({ onDisplay }) => {
  const router = useRouter();
  const [hidden, setHidden] = useState<boolean>(true);

  const handleLogOut = async () => {
    Auth.signOut();
    router.push('/login');
  };

  return (
    <>
      <div className="main-header bg-slate-100">
        <div className="header-left" onClick={() => onDisplay()}>
          <span id="menuIconOpen">
            <AiOutlineMenu className="h-6 w-6" />
          </span>
        </div>
        <div className="ml-auto p-2">
          <button className="flex" onClick={() => setHidden(!hidden)}>
            <img alt={'profIcon'} src={proficon.src} width={50} height={50} />
          </button>
          {!hidden ? (
            <div
              className="pointer-events-auto absolute -ml-40 rounded-lg border-x border-b bg-white p-4"
              onMouseLeave={() => setHidden(true)}
            >
              <div
                  className="pointer-events-auto mt-5 cursor-pointer text-[blue] underline"
                  onClick={() => router.push('/change-email')}
              >
                メールアドレス変更
              </div>
              <div
                className="pointer-events-auto mt-5 cursor-pointer text-[blue] underline"
                onClick={() => router.push('/change-password')}
              >
                パスワード変更
              </div>
              <div
                className="pointer-events-auto mt-5 cursor-pointer text-[blue] underline"
                onClick={() => handleLogOut()}
              >
                ログアウト
              </div>
            </div>
          ) : (
            <></>
          )}
        </div>
      </div>
    </>
  );
};

export default Header;