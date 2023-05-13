import { useState } from 'react';
import { useRouter } from 'next/router';
import InputText from '@/components/common/form/input-text';
import Button from '@/components/common/form/button';
import { useForm, FormProvider } from 'react-hook-form';
import { toast } from 'react-toastify';
import {Auth} from "aws-amplify";

export type ResetPasswordFormProps = {
  email: string;
};

export default function ForgotPassword() {
  const router = useRouter();
  const [disableButton, setDisableButton] = useState(true);
  const methods = useForm<ResetPasswordFormProps>();
  const { handleSubmit } = methods;

  const onEmailChange = (email: string) => {
    setDisableButton(!email);
  };

  const onSubmit = async (data: ResetPasswordFormProps) => {
    // TODO: Cognito:パスワード再設定処理
    await Auth.forgotPassword(data.email)
        .then(res => {
          toast.success('入力されたメールアドレスに認証コードを送信しました');
          router.push('/set-new-password')
        })
        .catch(error => toast.error(JSON.stringify(error)));
  };

  return (
    <>
      <div>
        <div className="my-5 text-2xl font-bold">パスワードのリセット</div>
      </div>
      <div className="mx-[10%] sm:mx-[25%]">
        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-[1.5rem] text-left">
              <p>ご登録されているEメールアドレスに、パスワードリセット用のリンクURLを送信します。</p>
            </div>
            <div className="text-left">
              <p>Eメールアドレス</p>
              <InputText id={'email'} onChange={onEmailChange} />
            </div>
            <div className="mt-5 flex justify-between">
              <Button
                type="button"
                label="キャンセル"
                addClass="mr-5 text-btn-color bg-white border-btn-color hover:text-white"
                onClick={() => router.push('/login')}
              />
              <Button type="submit" label="送信" disabled={disableButton} />
            </div>
          </form>
        </FormProvider>
      </div>
    </>
  );
}