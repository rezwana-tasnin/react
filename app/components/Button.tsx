export const Button = ({ children, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="bg-white text-black px-4 py-2 rounded-lg font-semibold hover:bg-gray-300 cursor-pointer"
    >
      {children || "Click me"}
    </button>
  );
};
