import React from "react";
import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ShowCase from "./components/ShowCase";
import Todo from "./components/todos/Todo1/Todo1";
import Accordion1 from "./components/accordions/Accordion1/Accordion1";
import Accordion2 from "./components/accordions/Accordion2/Accordion2";
import Accordion3 from "./components/accordions/Accordion3/Accordion3";
import Accordion4 from "./components/accordions/Accordion4/Accordion4";
import Sidebar1 from "./components/sidebars/Sidebar1/Sidebar1";
import Sidebar2 from "./components/sidebars/Sidebar2/Sidebar2";

const showcase = [
  {
    id: 1,
    name: "Todo",
    description: "Manage your tasks efficiently",
    path: "/todos/Todo1",
    element: <Todo />,
  },

  {
    id: 2,
    name: "Accordion1",
    description: "Manage your tasks efficiently",
    path: "/accordions/Accordion1",
    element: <Accordion1 />,
  },
  
  {
    id: 3,
    name: "Accordion2",
    description: "Manage your tasks efficiently",
    path: "/accordions/Accordion2",
    element: <Accordion2 />,
  },

  {
    id: 4,
    name: "Accordion3",
    description: "Manage your tasks efficiently",
    path: "/accordions/Accordion3",
    element: <Accordion3 />,
  },

  {
    id: 5,
    name: "Accordion4",
    description: "Premium Glassmorphism Accordion - TikTok Ready!",
    path: "/accordions/Accordion4",
    element: <Accordion4 />,
  },

  {
    id: 6,
    name: "Sidebar1",
    description: "Manage your tasks efficiently",
    path: "/sidebars/Sidebar1",
    element: <Sidebar1 />,
  },
  
  {
    id: 7,
    name: "Sidebar2",
    description: "Premium Floating Sidebar - Glassmorphism Design",
    path: "/sidebars/Sidebar2",
    element: <Sidebar2 />,
  },
];

const routes = showcase.map((item) => ({
  path: item.path,
  element: item.element,
}));

const router = createBrowserRouter([
  {
    path: "/",
    element: <ShowCase showcase={showcase} />,
    errorElement: <div>Something went wrong!</div>,
  },
  ...routes,
]);

export default function App() {
  return <RouterProvider router={router} />;
}
