export const Input = (props: any) => {
  const {
    name,
    value,
    onChange,
    type = "text",
    placeholder = "Write here...",
  } = props;
  return (
    <input
      type={type}
      name={name}
      placeholder={placeholder}
      className="bg-neutral-900 p-2 placeholder:text-neutral-300 rounded-md w-full"
      value={value}
      onChange={(e) => {
        onChange?.(e.target.value);
      }}
    />
  );
};
