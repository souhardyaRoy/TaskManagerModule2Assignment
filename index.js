const express = require("express");
const bodyParser = require("body-parser");
const validator = require("./validator/validator");

const app = express();
const port = 3000;

let tasks = [
  {
    id: "1",
    title: "Complete Project Proposal",
    level: "p1",
    description: "Write and submit the project proposal by the deadline.",
    completed: false,
  },
  {
    id: "2",
    title: "Meeting with Client",
    level: "p2",
    description:
      "Schedule a meeting with the client to discuss project details.",
    completed: true,
  },
  {
    id: "3",
    title: "Develop API Endpoints",
    level: "p3",
    description:
      "Implement RESTful API endpoints for the task manager application.",
    completed: false,
  },
];

app.use(bodyParser.json());

app.get("/tasks", (req, res) => {
  res.status(200).send(tasks);
});

app.get("/tasks/:id", (req, res) => {
  const id = req.params.id;
  let [filteredTask] = tasks.filter((val) => val.id == id);
  if (filteredTask != {}) {
    res.json({ filteredTask });
  } else {
    res.status(404).json({ error: "Task not found" });
  }
});

app.post("/tasks", (req, res) => {
  const userProvidedDetails = req.body;
  if (validator.validateTasksInfo(userProvidedDetails).status == true) {
    tasks.push(userProvidedDetails);
    return res.status(201).send(tasks);
  } else if(validator.validateTasksInfo(userProvidedDetails).status==false) {
    return res
      .status(400)
      .json(validator.validateTasksInfo(userProvidedDetails));
  } 
});

app.put("/tasks/:id", (req, res) => {
  const id = req.params.id;
  const updatedTask = req.body;
  const taskIndex = tasks.findIndex((task) => task.id === id);
  if (taskIndex !== -1) {
    if (validator.validateTasksInfo(updatedTask).status == true) {
      tasks[taskIndex] = updatedTask;
      res.status(200).json({ message: "Task updated successfully", updatedTask });
    } else if(validator.validateTasksInfo(updatedTask).status==false) {
      return res
        .status(400)
        .json(validator.validateTasksInfo(updatedTask));
    } 
  } else {
    res.status(404).json({ error: "Task not found" });
  }
});

app.delete("/tasks/:id", (req, res) => {
  const id = req.params.id;
  const taskIndex = tasks.findIndex((task) => task.id === id);
  if (taskIndex !== -1) {
    tasks.splice(taskIndex, 1);
    res.status(200).json({ message: "Task deleted successfully" });
  } else {
    res.status(404).json({ error: "Task not found" });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
