import React, {createContext} from 'react';
import InputText from '@/components/common/form/input-text';
import InputPassword from '@/components/common/form/input-password';
import InputCheckbox from '@/components/common/form/input-checkbox';
import Button from '@/components/common/form/button';
import { useForm, FormProvider } from 'react-hook-form';
import { Auth } from 'aws-amplify';
import { toast } from 'react-toastify';
import { useRouter } from "next/router";

type SignUpFormProps = {
  email: string;
  password: string;
  password2: string;
};

export default function SignUp() {
  const router = useRouter();
  const methods = useForm<SignUpFormProps>();
  const { handleSubmit, getValues, watch, setError } = methods;

  const onSubmit = async () => {
    const values = getValues();
    if (values.password !== values.password2) {
      setError('password2', { type: 'custom', message: 'パスワードが一致しません' });
      return;
    }
    try {
      const user = await Auth.signUp({
        username: values.email,
        password: values.password,
        attributes: {
          email: values.email,
        },
      });
      if (user) {
        toast.success('ユーザー登録が完了しました');
        router.push('/confirm-sign-up');
      }
    } catch (e) {
      toast.error(JSON.stringify(e));
    }
  };

  return (
    <FormProvider {...methods}>
      <div>
        <div className="my-5 text-2xl font-bold">メールアドレスとパスワードを設定してください</div>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="mx-[10%] sm:mx-[25%]" noValidate>
        <div className="text-left">
          <p className="mt-3 text-sm">メールアドレス</p>
          {/* TODO: Cognito側のパスワードポリシーに合わせてバリデーションルールを加えること */}
          <InputText id={'email'} rules={{ required: '入力してください' }} />
          <p className="mt-3 text-sm">パスワード</p>
          <InputPassword id={'password'} rules={{ required: '入力してください' }} />
          <p className="mt-3 text-sm">パスワード確認用</p>
          <InputPassword id={'password2'} rules={{ required: '入力してください' }} />
        </div>
        <div className="mx-5 mt-5 text-center">
          <Button type="submit" label="送信" />
        </div>
      </form>
    </FormProvider>
  );
}