const express = require('express');

const {
  addTask,
  RemoveTask,
  listTasks,
  updateTaskStatus
} = require('./model/tasks');

const db = require('./dao/databaseInstance');
const app = express();
const port = 3000;

/**
 * Closes the database connection.
 */
function closeDB()
{
  db.close((err) => {
    if (err) {
      console.error('Error closing the database:', err.message);
    } else {
      console.log('Database closed');
    }
  });
}

/**
 * Endpoint to retrieve and render a list of tasks.
 */
app.get('/list-tasks', (req, res) => {
  listTasks((tasks) => {
    res.render('index', { tasks });
  });
});

/**
 * Endpoint to add a new task.
 */
app.post('/add-task', express.urlencoded({ extended: true }), (req, res) => {
  const taskDescription = req.body.taskDescription;

  if (taskDescription) {
    addTask(taskDescription, (message, success) => {
      res.json({ message, success });
    });
  } else {
    res.json({ message: "Descripción de tarea vacía", success: false });
  }
});

/**
 * Endpoint to remove a task.
 */
app.post('/remove-task', express.urlencoded({ extended: true }), (req, res) => {
  const taskIndex = req.body.taskIndex;

  if (taskIndex) {
    RemoveTask(taskIndex, (message, success) => {
      res.json({ message, success });
    });
  } else {
    res.json({ message: "Índice de tarea no proporcionado", success: false });
  }
});

/**
 * Endpoint to update the status of a task.
 */
app.post('/update-task-status', express.urlencoded({ extended: true }), (req, res) => {
  const taskId = req.body.taskId;
  const newStatus = req.body.newStatus;

  if (taskId && newStatus) {
    updateTaskStatus(taskId, newStatus, (response) => {
      res.json(response);
    });
  } else {
    res.json({ message: "Parámetros de tarea no proporcionados", success: false });
  }
});

// Configuration settings
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/views'));

// Start the server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});