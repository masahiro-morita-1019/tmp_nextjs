import React, { useState, useRef, useEffect } from "react"
import { useForm, FormProvider } from 'react-hook-form';
import Button from "@/components/common/form/button";
import InputText from "@/components/common/form/input-text";
import {Auth} from "aws-amplify";
import {toast} from "react-toastify";
import {router} from "next/client";

export type ConfirmResetPasswordFormProps = {
  email: string;
  authenticationCode: string;
};

export default function ConfirmSignUp() {
  const methods = useForm<ConfirmResetPasswordFormProps>();
  const { handleSubmit } = methods;

  const onSubmit = async (data: ConfirmResetPasswordFormProps) => {
    await Auth.confirmSignUp(data.email, data.authenticationCode)
        .then((result) => {
            toast.success('認証に成功しました')
            router.push('/login')
        })
        .catch((e)=>{
          toast.error('認証に失敗しました')
        })
  }
  return(
      <>
        <div>
          <div className="my-5 text-2xl font-bold">認証コードの入力</div>
        </div>
        <div className={'mx-[10%] sm:mx-[20%] text-left'}>
          <FormProvider {...methods}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-[1.5rem] text-center">
                    <p>ご登録されたEメールアドレスに認証コードを送信しました。</p>
                </div>
                  <p>Eメールアドレス<span className={'text-xs'}>(確認のためもう一度ご入力ください)</span></p>
                  <InputText id={'email'} rules={{required: '入力してください'}}/>
                <p>認証コード</p>
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
              <div className={'pt-3 flex justify-between'}>
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