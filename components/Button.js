export default function Button({
  children,
  className,
  handleClick,
  isActive,
  isDisabled,
}) {
  const bgColor = () => {
    let str = "";
    if (isActive) {
      str = "bg-green-500";
    } else {
      str = "bg-blue-900";
      if (isDisabled) {
        str = "bg-blue-900 opacity-20";
      }
    }

    return str;
  };

  return (
    <button
      className={`text-lg uppercase tracking-wide font-bold shadow-md rounded-3xl px-6 py-4 text-white w-full ${className} ${bgColor()}`}
      onClick={handleClick}
    >
      {children}
    </button>
  );
}
