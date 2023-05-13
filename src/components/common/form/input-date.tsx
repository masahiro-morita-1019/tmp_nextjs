import { ErrorMessage } from '@hookform/error-message';
import { useFormContext } from 'react-hook-form';

type InputTextProps = {
  id: string; // id属性値
  defaultValue?: string; // 初期値
  onChange?: (e: any) => void; // 日付変更イベント
  rules?: Record<string, any>; //入力チェックルール(react-hook-formライブラリを参照)
};

/**
 * 日付入力コンポーネント
 */
const InputDate: React.FC<InputTextProps> = ({ id, defaultValue, onChange, rules }) => {
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
      <input
        {...register(id, registerParams)}
        type="date"
        id={id}
        className="pointer-events-auto w-full rounded border border-black px-2 py-1 outline-0"
        value={defaultValue}
      />
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

export default InputDate;
