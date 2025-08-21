import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("about", "routes/about.tsx"),
  route("contacts", "routes/Contacts.tsx"),
  route("filter", "routes/Filter.tsx"),
  route("quiz" , "routes/Quiz.tsx"),
  route("birthday", "routes/BirthdayCard.tsx"),
] satisfies RouteConfig;
