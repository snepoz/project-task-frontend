// src/components/TaskList.jsx
import React, { useEffect } from "react";
import axios from "axios";
import "../styles/TaskList.css";

const TaskList = ({ fetchTasks, tasks, setTasks, setCurrentTask }) => {
  useEffect(() => {
    fetchTasks();
  }, []);

  const deleteTask = async (id) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:5000/api/tasks/${id}`, {
        headers: { Authorization: token },
      });
      setTasks(tasks.filter((task) => task.id !== id));
    } catch (err) {
      console.error("Error deleting task:", err);
    }
  };

  const toggleComplete = async (task) => {
    try {
      const token = localStorage.getItem("token");
      const updatedTask = await axios.put(
        `http://localhost:5000/api/tasks/${task.id}`,
        { ...task, completed: !task.completed },
        {
          headers: { Authorization: token },
        }
      );
      setTasks(tasks.map((t) => (t.id === task.id ? updatedTask.data : t)));
    } catch (err) {
      console.error("Error toggling task completion:", err);
    }
  };

  return (
    <div className="task-list">
      {tasks.map((task) => (
        <div key={task.id} className="task-item">
          <div>
            <h3
              style={{
                textDecoration: task.completed ? "line-through" : "none",
              }}
            >
              {task.title}
            </h3>
            <p>{task.description}</p>
          </div>
          <div className="task-buttons">
            <button
              className="complete-btn"
              onClick={() => toggleComplete(task)}
            >
              {task.completed ? "Undo" : "Complete"}
            </button>
            <button className="edit-btn" onClick={() => setCurrentTask(task)}>
              Edit
            </button>
            <button className="delete-btn" onClick={() => deleteTask(task.id)}>
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TaskList;
