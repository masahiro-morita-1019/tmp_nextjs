import { ReactNode } from 'react';
import { overrideTailwindClasses } from 'tailwind-override';

type ButtonProps = {
  type: 'submit' | 'button'; // type属性値
  label?: string; // ボタンのラベル
  disabled?: boolean; // disabled属性値
  onClick?: (value: string) => void; // テキスト変更イベント
  addClass?: string; // CSSを追加する場合に指定
  children?: ReactNode;
};

/**
 * ボタンコンポーネント
 */
const Button: React.FC<ButtonProps> = ({ type, label, disabled = false, onClick, addClass, children }) => {
  const clickButton = (e: any) => {
    if (onClick) {
      onClick(e.target.value);
    }
  };
  // 親から指定されたCSSがあれば反映
  let buttonClass =
    'border-radius pointer-events-auto disabled:pointer-events-none h-[2rem] w-1/2 rounded-2xl border bg-btn-color disabled:bg-gray-400 py-[0.25rem] px-auto text-center font-[1rem] text-white hover:bg-btn-hover-color disabled:opacity-50 disabled:cursor-not-allowed';
  if (addClass) {
    buttonClass = `${buttonClass} ${addClass}`;
  }

  return (
    <>
      <button
        type={type}
        disabled={disabled}
        className={overrideTailwindClasses(buttonClass)}
        onClick={(e) => {
          clickButton(e);
        }}
      >
        {children ? children : label}
      </button>
    </>
  );
};

export default Button;
