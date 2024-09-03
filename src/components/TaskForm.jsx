// src/components/TaskForm.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/TaskForm.css";

const TaskForm = ({ fetchTasks, currentTask, setCurrentTask }) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    completed: false, // Default to false for a new task
  });

  useEffect(() => {
    if (currentTask) {
      setFormData({
        title: currentTask.title,
        description: currentTask.description,
        completed: currentTask.completed, // Ensure completed status is carried over
      });
    } else {
      setFormData({ title: "", description: "", completed: false }); // Reset form
    }
  }, [currentTask]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    try {
      if (currentTask) {
        // Update existing task
        await axios.put(
          `http://localhost:5000/api/tasks/${currentTask.id}`,
          formData,
          {
            headers: { Authorization: token },
          }
        );
        setCurrentTask(null); // Clear the current task after updating
      } else {
        // Create new task
        await axios.post("http://localhost:5000/api/tasks", formData, {
          headers: { Authorization: token },
        });
      }
      setFormData({ title: "", description: "", completed: false });
      fetchTasks(); // Refresh task list
    } catch (err) {
      console.error("Error creating/updating task:", err);
    }
  };

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <input
        type="text"
        name="title"
        placeholder="Title"
        value={formData.title}
        onChange={handleChange}
        required
      />
      <textarea
        name="description"
        placeholder="Description"
        value={formData.description}
        onChange={handleChange}
        required
      ></textarea>
      <button type="submit">{currentTask ? "Update Task" : "Add Task"}</button>
    </form>
  );
};

export default TaskForm;
