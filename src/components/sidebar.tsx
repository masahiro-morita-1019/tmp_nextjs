import { FC, useEffect, useState } from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import Link from 'next/link';
import { useRouter } from 'next/router';

type Props = {
  isDisplay: boolean;
  onDisplay: (isDisplay: boolean) => void;
};

const Sidebar: FC<Props> = ({ isDisplay, onDisplay }) => {
  const [display, setDisplay] = useState<boolean>(false);
  const [select, setSelect] = useState<number>(0);
  const router = useRouter();

  const handleSwitchMainMenu = (mainMenu: number) => {
    setSelect(mainMenu);
    onDisplay(false);
  };

  useEffect(() => {
    setDisplay(isDisplay);
  }, [isDisplay]);

  useEffect(() => {
    if (!router.isReady) {
      return;
    } else if (router.pathname === '/home') {
      setSelect(0);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.isReady, router.pathname]);

  return (
    <>
      <div className={`sidebar-area ${display ? 'show' : ''}`}>
        <nav className={`main-sidebar ${display ? 'show' : ''} overflow-auto`}>
          <aside>
            <span id="menuIconClose" onClick={() => onDisplay(false)}>
              <AiOutlineClose className="ml-auto h-6 w-6" />
            </span>
            <Link
              href="/home"
              className={select === 0 ? 'menu-selected' : ''}
              id="mainMenu"
              onClick={() => handleSwitchMainMenu(0)}
            >
              トップページ
            </Link>
          </aside>
        </nav>
      </div>
    </>
  );
};

export default Sidebar;