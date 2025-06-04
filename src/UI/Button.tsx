import classNames from "classnames";

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  buttonText: string;
  onClick?: () => void;
  className?: string;
  btnColor?: string;
}
const Button: React.FC<Props> = ({
  buttonText,
  onClick,
  className,
  btnColor,
  ...rest
}: Props) => {
  return (
    <button
      className={classNames(className, "py-2 px-4 rounded-2xl", btnColor)}
      onClick={onClick}
      {...rest}
    >
      {buttonText}
    </button>
  );
};

export default Button;
