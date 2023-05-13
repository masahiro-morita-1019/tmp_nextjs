import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import Layouts from '@/components/layout/layouts';
import Head from 'next/head';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Auth } from '@/components/authorization/auth';
import { AuthProvider } from '@/components/authorization/use-auth';
import { Amplify } from 'aws-amplify';

Amplify.configure({
  Auth: Auth,
  ssr: true,
});
export default function App({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <Layouts>
        <Head>
          <title>共通ページタイトル</title>
        </Head>
        <ToastContainer autoClose={3000} />
        <Component {...pageProps} />
      </Layouts>
    </AuthProvider>
  );
}