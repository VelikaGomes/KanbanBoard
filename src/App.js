import { useState, useEffect } from "react";
import { supabase } from "./supabase";
import "./App.css";

const columns = ["to do", "in progress", "done"];

function App() {
  const [tasks, settasks] = useState([]);
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [dragTask, setDraggedTask] = useState(null);

  const addTask = async () => {
    if (!newTaskTitle) return;

    const { data, error } = await supabase
      .from("Tasks")
      .insert([{ title: newTaskTitle, status: "to do" }])
      .select();

    if (error) {
      alert("Error inserting task.");
      return;
    }

    settasks((prev) => [...prev, data[0]]);
    setNewTaskTitle("");
  };

  function DragStart(task) {
    setDraggedTask(task);
  }

  async function Drop(status) {
    if(!dragTask) return;

    const{error }= await supabase
    .from("Tasks")
    .update({status})
    .eq("id", dragTask.id)
    .select();

    if(error){
      alert("error updating task");
    }

    settasks((prev) =>
    prev.map((t) => (t.id===dragTask.id ? {...t, status } :t))
  );
  setDraggedTask(null);
  }

  useEffect(() => {
    async function fetchTasks() {
      const { data, error } = await supabase.from("Tasks").select("*");
      if (error) {
        alert("Error fetching tasks: ");
        return;
      }
      settasks(data);
    }

    fetchTasks();
  }, []);

  return (
    <div style={{ font: "sans-serif", padding: "20px", backgroundColor:"white"}}>
      <h1 style={{ textAlign: "center" }}> Kanban Board</h1>
      <div
        style={{
          margin: "20px auto",
          width: "fit-content",
          display: "flex",
          alignItems: "center",
          gap: "30px",
        }}>
        <input
          type="text"
          placeholder="Add new task here"
          value={newTaskTitle}
          onChange={(e) => setNewTaskTitle(e.target.value)}
          style={{
            padding: "10px",  fontSize: "15px",
            border: "1px solid rgb(0, 0, 0)",
            width: "400px",  height: "20px",
            borderRadius: "5px",
          }}
        />
        <button
          onClick={addTask}
          style={{
            padding: "10px",
            backgroundColor: "#640D14",
            color: "white",
            height: "40px", minwidth: "250px",
            fontWeight: "bold",
            borderRadius: "5px",
          }}>Add Task
        </button>

      </div>
      <div style={{ display: "flex", gap: "15px", justifyContent: "center" }}>
        {columns.map((column) => (
          <div
            key={column} onDragOver={(e) => e.preventDefault()}
            onDrop={() =>Drop(column)}
            style={{
              backgroundColor: "#eee",
              minWidth: "200px",
              width:"300px",padding: "10px",
              borderRadius: "8px",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <h3 style={{ color: "black", marginBottom: "10px" }}>{column}</h3>
            {tasks
              .filter((task) => task.status === column)
              .map((task) => (
                <div
                  key={task.id}
                  draggable onDragStart={() => DragStart(task)}
                  style={{
                    backgroundColor: "white",
                    margin: "5px 0",
                    padding: "8px",
                    borderRadius: "3px",
                    boxShadow:"1px #ddd",}}>
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
