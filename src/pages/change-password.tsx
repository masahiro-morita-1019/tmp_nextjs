import React from 'react';
import InputPassword from '@/components/common/form/input-password';
import Button from '@/components/common/form/button';
import { useRouter } from 'next/router';
import { useForm, FormProvider } from 'react-hook-form';
import { Auth } from 'aws-amplify';
import { toast } from 'react-toastify';

type Props = {
  onClose?: () => void;
};
type ChangePasswordFormProps = {
  password: string;
  newPassword: string;
  newPassword2: string;
};

const ChangePassword: React.FC<Props> = ({ onClose }) => {
  const router = useRouter();
  const methods = useForm<ChangePasswordFormProps>();
  const { handleSubmit, getValues, setError } = methods;

  const onSubmit = async () => {
    const values = getValues();
    if (values.newPassword !== values.newPassword2) {
      setError('newPassword2', { type: 'custom', message: 'パスワードが一致しません' });
      return;
    }

    // IDトークン取得
    const res = await Auth.currentSession();
    const idToken = res.getIdToken().getJwtToken();
    try {
      const user = await Auth.currentAuthenticatedUser();
      const changePasswordResult = await Auth.changePassword(user, values.password, values.newPassword);
      if (!!changePasswordResult) {
        toast.success('パスワードを変更しました');
      }
    } catch (e) {
      console.error(e);
      toast.error('パスワードは変更できませんでした');
    }
  };

  return (
    <div className={'container m-auto h-full w-full bg-white p-4'}>
      <FormProvider {...methods}>
        <div className="mb-8 text-center text-2xl font-bold">パスワードの変更</div>
        <form onSubmit={handleSubmit(onSubmit)} className="mx-[10%] sm:mx-[25%]" noValidate>
          <div className="text-left">
            <p className="mt-3 text-sm">現在のパスワード</p>
            <InputPassword id={'password'} rules={{ required: '入力してください' }} />
            <p className="mt-3 text-sm">新しいパスワード</p>
            <InputPassword id={'newPassword'} rules={{ required: '入力してください' }} />
            <p className="mt-3 text-sm">確認用</p>
            <InputPassword id={'newPassword2'} rules={{ required: '入力してください' }} />
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