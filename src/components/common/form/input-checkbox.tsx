import { useFormContext } from 'react-hook-form';

type InputTextProps = {
  id: string; // id属性値
  label?: any;
  defaultValue?: string; // 初期値
  onChange?: (value: string) => void; // テキスト変更イベント
  rules?: Record<string, any>; //入力チェックルール(react-hook-formライブラリを参照)
};

/**
 * テキスト入力コンポーネント
 */
const InputCheckbox: React.FC<InputTextProps> = ({ id, label, defaultValue, onChange, rules }) => {
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
    <label>
      <input
        {...register(id, registerParams)}
        type="checkbox"
        id={id}
        className="pointer-events-auto w-full rounded border border-black px-2 py-1 outline-0"
        value={defaultValue}
      />
      {label}
    </label>
  );
};

export default InputCheckbox;
