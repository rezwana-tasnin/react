export const Button = ({ children, onClick, className }: any = {}) => {
  return (
    <button
      onClick={onClick}
      className={
        "bg-blue-300 text-black px-4 py-2 rounded-lg font-semibold hover:bg-blue-500 cursor-pointer" +
        ` ${className}`
      }
    >
      {children || "Click me"}
    </button>
  );
};
