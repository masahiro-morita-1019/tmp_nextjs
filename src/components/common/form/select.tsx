import { ErrorMessage } from '@hookform/error-message';
import { useFormContext } from 'react-hook-form';

interface OptionProps {
  key: any;
  value: any;
}
type SelectProps = {
  id: string; // id属性値
  defaultValue?: string; // 初期値
  options: OptionProps[];
  onChange?: (value: string) => void;
  rules?: Record<string, any>; //入力チェックルール(react-hook-formライブラリを参照)
};

/**
 * テキスト入力コンポーネント
 */
const Select: React.FC<SelectProps> = ({ id, defaultValue, options, onChange, rules }) => {
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
      <select
        {...register(id, registerParams)}
        id={id}
        name={id}
        className="pointer-events-auto w-full rounded border border-black px-2 outline-0"
        defaultValue={defaultValue}
      >
        <option value=""></option>
        {options.map((option) => (
          <option key={option.key} value={option.key}>
            {option.value}
          </option>
        ))}
      </select>
      <div className="-mt-3 mb-3 h-[1.25rem]">
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

export default Select;
