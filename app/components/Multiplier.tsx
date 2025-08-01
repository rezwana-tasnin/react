import { useState } from "react";

export const Multiplier = (props) => {
  const [num1, setNum1] = useState(props.num1 || 0);
  const [num2, setNum2] = useState(props.num2 || 0);
  return (
    <div className="flex gap-4 mt-8 items-center">
      <input
        value={num1}
        onChange={(e) => {
          setNum1(+e.target.value);
        }}
        className="w-16 bg-white rounded-md text-black p-2"
        type="number"
      />
      <div className="font-bold"> X </div>
      <input
        value={num2}
        onChange={(e) => {
          setNum2(+e.target.value);
        }}
        className="w-16 bg-white rounded-md text-black p-2"
        type="number"
      />
      <div className="font-bold"> = </div>
      <input
        value={num1 * num2}
        className="w-16 bg-white rounded-md text-black p-2"
        type="number"
      />
    </div>
  );
};
