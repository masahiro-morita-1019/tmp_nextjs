import InputPassword from '@/components/common/form/input-password';
import Button from '@/components/common/form/button';
import { useForm, FormProvider } from 'react-hook-form';
import { useRouter } from 'next/router';
import InputText from "@/components/common/form/input-text";
import React from "react";
import {Auth} from "aws-amplify";
import {toast} from "react-toastify";

export type SetNewPasswordFormProps = {
  email: string;
  authenticationCode: string;
  password: string;
  confirmPassword: string;
};

export default function SetNewPassword() {
  const router = useRouter();
  const methods = useForm<SetNewPasswordFormProps>();
  const { handleSubmit, setError } = methods;

  const onSubmit = async (data: SetNewPasswordFormProps) => {
    if (data.password !== data.confirmPassword) {
      setError('confirmPassword', { type: 'custom', message: 'パスワードが一致しません' });
      return;
    }

    await Auth.forgotPasswordSubmit(data.email, data.authenticationCode, data.password)
        .then(data => {
          toast.success('パスワードを再設定しました')
          router.push('/login')
        })
        .catch(err => {
          // toast.error('パスワード再設定に失敗しました')
          toast.error(JSON.stringify(err))
        })
  };

  return (
    <>
      <div>
        <div className="my-5 text-2xl font-bold">パスワードを設定してください</div>
      </div>
      <div className="mx-[10%] sm:mx-[25%]">
        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="text-left">
              <p className="mt-5">メールアドレス</p>
              <InputText id={'email'} rules={{required: '入力してください'}}/>
              <p className="mt-5">認証コード</p>
              <InputText
                  id={'authenticationCode'}
                  rules={{
                    required: '入力してください',
                    pattern: {
                      value: /^[0-9]{6}$/,
                      message: '認証コードは6桁の半角数字です',
                    }
                  }}
              />
              <p className="mt-5">新パスワード</p>
              <p className="text-[.5rem] text-warning-color">(英字大文字小文字と数字を含む8文字以上)</p>
              <InputPassword id={'password'} rules={{ required: '入力してください' }} />
              <p className="mt-5">確認用</p>
              <InputPassword id={'confirmPassword'} rules={{ required: '入力してください' }} />
            </div>
            <div className="mt-5 flex justify-between">
                <Button
                    type="button"
                    label="キャンセル"
                    addClass="mr-5 text-btn-color bg-white border-btn-color hover:text-white"
                    onClick={() => router.push('/login')}
                />
              <Button type="submit" label="送信" />
            </div>
          </form>
        </FormProvider>
      </div>
    </>
  );
}