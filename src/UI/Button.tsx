import classNames from "classnames";

interface Props {
  buttonText: string;
  onClick: () => void;
  className?: string;
  btnColor?: string;
}
const Button: React.FC<Props> = ({
  buttonText,
  onClick,
  className,
  btnColor,
}: Props) => {
  return (
    <button
      className={classNames(className, "py-2 px-4 rounded-2xl", btnColor)}
      onClick={onClick}
    >
      {buttonText}
    </button>
  );
};

export default Button;
