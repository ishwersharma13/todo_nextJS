import AddTodo from "@/components/add-todo";
import {Todos} from "@/components/todos";
import Navbar from "@/components/navbar";
import "./globals.css";
import { RiTodoLine } from "react-icons/ri";
import '../styles/tailwind.css';
const Page = () => {
    return (
      <main>
          <h2><RiTodoLine className="icons" /> Task Management App<RiTodoLine className="icons" /> </h2>
          <Navbar />
          <AddTodo />
          <Todos />
      </main>
    );
};

export default Page;