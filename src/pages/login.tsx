import React, { useEffect } from 'react';
import Link from 'next/link';
import InputText from '@/components/common/form/input-text';
import InputPassword from '@/components/common/form/input-password';
import Button from '@/components/common/form/button';
import { useForm, FormProvider } from 'react-hook-form';
import { Auth } from 'aws-amplify';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';

export type LoginFormProps = {
  userId: string;
  newPassword: string;
};

export default function Login() {
  const router = useRouter();
  const methods = useForm<LoginFormProps>();
  const { handleSubmit } = methods;

  const onSubmit = async (data: LoginFormProps) => {
    try {
      // Cognitoにログイン
      const user = await Auth.signIn(data.userId, data.newPassword);
      if (user?.challengeName === 'NEW_PASSWORD') {
        router.push('/forgot-password');
      } else {
        router.push('/home');
      }
    } catch (e) {
      console.log(e);
      toast.error('入力したメールアドレスあるいはパスワードが間違っています');
    }
  };

  // ログイン画面を開いたら必ずログアウト状態になるようにする
  useEffect(() => {
    Auth.signOut();
  }, []);

  return (
    <>
      <div>
        <div className="my-5 text-2xl font-bold">ログイン</div>
      </div>
      <div className="mx-[10%] sm:mx-[25%]">
        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="text-left">
              <p>メールアドレス</p>
              <InputText id={'userId'} rules={{ required: '入力してください' }} />
              <p className="mt-4">パスワード</p>
              <InputPassword id={'newPassword'} rules={{ required: '入力してください' }} />
              <div className="text-right">
                <Link href="/forgot-password">
                  <p className="py-1 pointer-events-auto cursor-pointer text-right text-xs text-[blue] underline">
                    パスワードを忘れた方
                  </p>
                </Link>
                <Link href="/sign-up">
                  <p className="py-1 pointer-events-auto cursor-pointer text-right text-xs text-[blue] underline">
                    新規登録はこちら
                  </p>
                </Link>
              </div>
            </div>
            <div className="mx-5 mt-6 text-center">
              <Button type="submit" label="送信" />
            </div>
          </form>
        </FormProvider>
      </div>
    </>
  );
}