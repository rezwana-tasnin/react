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
      <div className="flex p-4 rounded-md gap-10 mb-4 bg-rose-800">
        <Link
          className="hover:font-bold hover:underline hover:text-rose-100 "
          to="/"
        >
          Home
        </Link>

        <Link
          className="hover:font-bold hover:underline hover:text-rose-100 "
          to="/about"
        >
          About
        </Link>
        <Link
          className="hover:font-bold hover:underline hover:text-rose-100 "
          to="/contacts"
        >
          Contacts
        </Link>
        <Link
          className="hover:font-bold hover:underline hover:text-rose-100 "
          to="/filter"
        >
          Filter
        </Link>
      </div>
      <Counter title="Counter 1" min={-5} max={5} />
      <Counter title="Counter 2" max={100} delta={10} initial={1} />
      <Counter2 />
      <Multiplier num1={10} num2={10}></Multiplier>
      <Multiplier num1={1} num2={5}></Multiplier>
      {/* <a href="/about">About</a> */}
    </div>
  );
}
