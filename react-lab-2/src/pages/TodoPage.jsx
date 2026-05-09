import { useState } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";
import { v4 as uuidv4 } from "uuid";
import toast from "react-hot-toast";

export default function TodoPage() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState("");
  const { user, logout } = useAuth();
  const { darkMode, toggleTheme } = useTheme();
  const navigate = useNavigate();

  const handleAddTodo = (e) => {
    e.preventDefault();
    if (!input.trim()) {
      toast.error("Please enter a task");
      return;
    }
    setTodos([...todos, { id: uuidv4(), text: input.trim() }]);
    setInput("");
    toast.success("Task added!");
  };

  const handleDeleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
    toast.success("Task deleted!");
  };

  const handleLogout = () => {
    logout();
    toast.success("Logged out!");
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors">
      <header className="bg-white dark:bg-gray-800 shadow-sm">
        <div className="max-w-3xl mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-xl font-bold text-gray-800 dark:text-white">
            Hello, {user.name}!
          </h1>
          <div className="flex items-center gap-2">
            <button
              onClick={toggleTheme}
              className="px-3 py-2 rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors cursor-pointer"
            >
              {darkMode ? "☀️" : "🌙"}
            </button>
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-lg transition-colors cursor-pointer"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 py-8">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
            To Do List
          </h2>

          <form onSubmit={handleAddTodo} className="flex gap-2 mb-6">
            <input
              type="text"
              placeholder="Add a new task..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-1 px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
            />
            <button
              type="submit"
              className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors cursor-pointer"
            >
              Add
            </button>
          </form>

          {todos.length === 0 ? (
            <p className="text-center text-gray-400 dark:text-gray-500 py-8">
              No tasks yet. Add one above!
            </p>
          ) : (
            <ul className="space-y-2">
              {todos.map((todo) => (
                <li
                  key={todo.id}
                  className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg"
                >
                  <span className="text-gray-800 dark:text-gray-200">
                    {todo.text}
                  </span>
                  <button
                    onClick={() => handleDeleteTodo(todo.id)}
                    className="px-3 py-1 bg-red-500 hover:bg-red-600 text-white text-sm font-semibold rounded-lg transition-colors cursor-pointer"
                  >
                    Delete
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </main>
    </div>
  );
}
