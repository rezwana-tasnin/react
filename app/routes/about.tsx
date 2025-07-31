const StudentCard = (props) => {
  return (
    <div className="border-2 border-gray-300 rounded-md p-4 mb-4">
      {/* {JSON.stringify(props)} */}
      <h1>Name: {props.name}</h1>
      <h1>Age: {props.age}</h1>
      <h1>Town: {props.town}</h1>
    </div>
  );
};

export default function About() {
  const students = [
    { name: "Mastura", age: 20, town: "Jakarta" },
    { name: "John", age: 21, town: "New York" },
    { name: "Jane", age: 22, town: "London" },
    { name: "Jim", age: 23, town: "Paris" },
    { name: "Jill", age: 24, town: "Tokyo" },
  ];
  return (
    <div>
      {students.map((student) => (
        <StudentCard
          key={student.name}
          {...student}
          //  name={student.name}
          //  age={student.age}
          //  town={student.town}
        />
      ))}
    </div>
  );
}
