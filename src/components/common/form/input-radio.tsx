import { useFormContext } from 'react-hook-form';

interface RadioOptionProps {
  key: string | number;
  value: string | number;
  checked?: boolean;
}

type Props = {
  name: string;
  options: RadioOptionProps[];
  onChange?: (e: any) => void;
  rules?: Record<string, any>; //入力チェックルール(react-hook-formライブラリを参照)
};

const InputRadio: React.FC<Props> = ({ name, options, onChange, rules }) => {
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
    <fieldset className="flex w-full flex-row items-center space-x-4">
      {options.map((option, i) => (
        <div className="flex flex-row items-center" key={i}>
          <input
            {...register(name, registerParams)}
            name={name}
            type="radio"
            value={option.key}
            className="h-4 w-4 rounded-full border-gray-300 bg-white text-blue-600 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-800"
            defaultChecked={option.checked}
          />
          <label className="block whitespace-nowrap text-sm text-gray-700">{option.value}</label>
        </div>
      ))}
    </fieldset>
  );
};

export default InputRadio;
