import { useState, useEffect } from "react";
import { supabase } from "./supabase";
import "./App.css";

const columns = ["to do", "in progress", "done"];

function App() {
  const [tasks, settasks] = useState([]);
  const [newTaskTitle, setNewTaskTitle] = useState("");

  const addTask = async () => {
  if (!newTaskTitle) return;

  const { data, error } = await supabase
    .from("Tasks")
    .insert([{ title: newTaskTitle, status: "to do" }])
    .select();

  if (error) {
    alert("Error inserting task: " + error.message);
    console.error(error);
    return;
  }

  settasks((prev) => [...prev, data[0]]);
  setNewTaskTitle("");
};


  useEffect(() => {
    async function fetchTasks() {
      const { data, error } = await supabase.from("Tasks").select("*");
      if (error) {
        alert("Error fetching tasks: " + error.message);
       return;
      }
      settasks(data);
    };

    fetchTasks();
  }, []);

  return (
    <div style={{ font: "sans-serif", padding: "20px" }}>
      <h1 style={{ textAlign: "center" }}> Kanban Board</h1>
      <div
        style={{ margin: "20px auto", width:"fit-content",
          display: "flex",  alignItems:"center",
          gap: "30px",}}>
        <input
          type="text"  placeholder="New task..."
          value={newTaskTitle}  onChange={(e) => setNewTaskTitle(e.target.value)}
          style={{
            padding: "10px",
            fontSize: "15px", border: "1px solid rgb(0, 0, 0)",  
            width:"300px",
            borderRadius: "4px",
          }}
        />
        <button
          onClick={addTask}
          style={{  padding: "8px",  backgroundColor: "#640D14", color: "white",
            borderRadius: "5px",
          }}
        >
          Add Task
        </button>
      </div>
      <div style={{ display: "flex", gap: "15px", justifyContent: "center" }}>
  {columns.map((column) => (
    <div
      key={column}
      style={{
        backgroundColor: "white",
        minWidth: "200px",
        padding: "10px",
        border: "1px solid black",
        borderRadius: "5px",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <h3 style={{ color: "black", marginBottom: "10px" }}>{column}</h3>
      {tasks
        .filter((task) => task.status.toLowerCase() === column.toLowerCase())
        .map((task) => (
          <div
            key={task.id}
            style={{
              backgroundColor: "#f9f9f9",
              margin: "5px 0",
              padding: "8px",
              borderRadius: "3px",
              boxShadow: "0 0 3px black",
            }}
          >
            {task.title}
          </div>
        ))}
    </div>
  ))}
</div>

    </div>
  );
}

export default App;
