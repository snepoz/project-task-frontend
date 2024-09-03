// src/pages/Dashboard.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import TaskList from "../components/TaskList";
import TaskForm from "../components/TaskForm";
import "../styles/Dashboard.css";

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [currentTask, setCurrentTask] = useState(null);

  const fetchTasks = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get("http://localhost:5000/api/tasks", {
        headers: { Authorization: token },
      });
      setTasks(response.data);
    } catch (err) {
      console.error("Error fetching tasks:", err);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1>Task Manager Dashboard</h1>
      </div>

      <div className="task-section">
        <div className="task-list-container">
          <div className="task-list-header">
            <h2>Your Tasks</h2>
            <button onClick={() => setCurrentTask(null)}>Add New Task</button>
          </div>
          <div className="task-list">
            {tasks.length > 0 ? (
              <TaskList
                fetchTasks={fetchTasks}
                tasks={tasks}
                setTasks={setTasks}
              />
            ) : (
              <p className="no-tasks-message">
                No tasks available. Please add a task.
              </p>
            )}
          </div>
        </div>

        <div className="task-form-container">
          <h2>{currentTask ? "Edit Task" : "New Task"}</h2>
          <TaskForm
            fetchTasks={fetchTasks}
            currentTask={currentTask}
            setCurrentTask={setCurrentTask}
          />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
