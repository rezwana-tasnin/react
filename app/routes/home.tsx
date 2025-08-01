import type { Route } from "./+types/home";
import { Link } from "react-router";
import { Counter } from "~/components/Counter";
import { Counter2 } from "~/components/Counter2";
import { Multiplier } from "~/components/Multiplier";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Home() {
  return (
    <div className="p-4">
      <h1>Home</h1>
      <Link to="/about">About</Link>
      <Counter title="Counter 1" min={-5} max={5} />
      <Counter title="Counter 2" max={100} delta={10} initial={1} />
      <Counter2 />
      <Multiplier num1={10} num2={10}></Multiplier>
      <Multiplier num1={1} num2={5}></Multiplier>
      {/* <a href="/about">About</a> */}
    </div>
  );
}