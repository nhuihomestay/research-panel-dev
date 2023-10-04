import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import "react-toastify/dist/ReactToastify.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Navbar } from "./Navbar.tsx";
import { Summary } from "./components/Summary.tsx";
import { Track } from "./components/Track.tsx";
import { SumStudents } from "./components/SumStudents.tsx";
import { Form } from "./components/Form.tsx";
import { Context } from "./Context.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
        <Navbar />
        <App />
      </>
    ),
  },
  {
    path: "/Track",
    element: (
      <>
        <Navbar />
        <Track />
      </>
    ),
  },
  {
    path: "/Summary",
    element: (
      <>
        <Navbar />
        <Summary />
      </>
    ),
  },
  {
    path: "/SumStudents",
    element: (
      <>
        <Navbar />
        <SumStudents />
      </>
    ),
  },
  {
    path: "/Form",
    element: (
      <>
        <Navbar />
        <Form />
      </>
    ),
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Context>
      <RouterProvider router={router} />
    </Context>
  </React.StrictMode>
);
