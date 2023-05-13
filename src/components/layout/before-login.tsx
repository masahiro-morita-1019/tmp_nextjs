import { ReactNode } from 'react';

type Props = {
  children: ReactNode;
};
export default function BeforeLoginLayout({ children }: Props) {
  return (
    <>
      <main className={'flex h-screen w-screen justify-center bg-[#747c7c] p-5'}>
        <div className={'container m-auto w-[40rem] rounded-md bg-white p-[1.2rem] text-center'}>{children}</div>
      </main>
    </>
  );
}
