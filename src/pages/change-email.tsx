import React from 'react';
import Button from '@/components/common/form/button';
import { useRouter } from 'next/router';
import { useForm, FormProvider } from 'react-hook-form';
import { Auth } from 'aws-amplify';
import { toast } from 'react-toastify';
import InputText from "@/components/common/form/input-text";

type Props = {
  onClose?: () => void;
};

type ChangePasswordFormProps = {
  email: string;
};

const ChangePassword: React.FC<Props> = ({ onClose }) => {
  const router = useRouter();
  const methods = useForm<ChangePasswordFormProps>();
  const { handleSubmit, getValues, setError } = methods;

  const onSubmit = async () => {
    const values = getValues();

    // IDトークン取得
    const res = await Auth.currentSession();
    const idToken = res.getIdToken().getJwtToken();
    try {
      const user = await Auth.currentAuthenticatedUser();
      const changeEmailResult = await Auth.updateUserAttributes(user, { email: values.email });
      if (!!changeEmailResult) {
        toast.success('認証コードを送信しました');
        router.push('/confirm-change-email')
      }
    } catch (e) {
      console.error(e);
      toast.error('メールアドレスが確認できません');
    }
  };

  return (
    <div className={'container m-auto h-full w-full bg-white p-4'}>
      <FormProvider {...methods}>
        <div className="mb-8 text-center text-2xl font-bold">メールアドレスの変更</div>
        <form onSubmit={handleSubmit(onSubmit)} className="mx-[10%] sm:mx-[25%]" noValidate>
          <div className="text-left">
            <p className="mt-3 text-sm">Eメールアドレス</p>
            <InputText id={'email'} rules={{ required: '入力してください' }} />
          </div>
          <div className="mx-5 mt-5 flex text-center">
            <Button
              type="button"
              label="キャンセル"
              addClass="mr-5 text-btn-color bg-white border-btn-color hover:text-white"
              onClick={() => (router.push('/home'), onClose && onClose())}
            />
            <Button type="submit" label="送信" />
          </div>
        </form>
      </FormProvider>
    </div>
  );
};

export default ChangePassword;