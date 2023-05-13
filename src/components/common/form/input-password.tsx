import React, { useState } from 'react';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import { ErrorMessage } from '@hookform/error-message';
import { useFormContext } from 'react-hook-form';

type InputPasswordProps = {
  id: string; // id属性値
  onChange?: (value: string) => void; // テキスト変更イベント
  rules?: Record<string, any>; //入力チェックルール(react-hook-formライブラリを参照)
};

/**
 * パスワード入力コンポーネント
 */
const InputPassword: React.FC<InputPasswordProps> = ({ id, onChange, rules }) => {
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    formState: { errors },
  } = useFormContext();
  const inputChange = (e: any) => {
    if (onChange) {
      onChange(e.target.value);
    }
  };
  // registerメソッドのパラメータ生成
  const registerParams = {
    onChange: inputChange,
    ...rules,
  };

  return (
    <>
      <div className="pointer-events-auto flex rounded border border-black px-2 py-1">
        <input
          {...register(id, registerParams)}
          type={showPassword ? 'text' : 'password'}
          id={id}
          name={id}
          maxLength={99}
          className="w-full outline-0"
        />
        <label className="cursor-pointer text-black opacity-40" onClick={() => setShowPassword((prev) => !prev)}>
          {showPassword ? <AiFillEye className="h-6 w-6" /> : <AiFillEyeInvisible className="h-6 w-6" />}
        </label>
      </div>
      <div className="-mt-1 h-[1.25rem]">
        {/* エラーメッセージなしの場合、divタグ内部がなくなるのでスペースを挿入 */}
        &nbsp;
        <ErrorMessage
          errors={errors}
          name={id}
          render={({ message }) => <span className="text-xs text-red-500">{message}</span>}
        />
      </div>
    </>
  );
};

export default InputPassword;