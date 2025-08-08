import { StudentCard } from "@/components/StudentCard";

export default function About() {
  const students = [
    { name: "Mastura", age: 20, town: "Jakarta" },
    { name: "John", age: 21, town: "New York" },
    { name: "Jane", age: 22, town: "London" },
    { name: "Jim", age: 23, town: "Paris" },
    { name: "Jill", age: 24, town: "Tokyo" },
  ];
  console.log(
    students,
    students.map((item) => {
      return {
        ...item,
        age: item.age + 1,
      };
    })
  );
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
