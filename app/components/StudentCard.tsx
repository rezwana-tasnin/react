export const StudentCard = (props) => {
  return (
    <div className="border-2 border-gray-300 rounded-md p-4 mb-4">
      {/* {JSON.stringify(props)} */}
      <h1>Name: {props.name}</h1>
      <h1>Age: {props.age}</h1>
      <h1>Town: {props.town}</h1>
    </div>
  );
};
