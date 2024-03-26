const db = require('../dao/databaseInstance');

/**
 * Provides functions to interact with the tasks database.
 */
db.serialize(() => {
  
  /**
   * Adds a new task to the database.
   * @param {string} taskDescription - The description of the task.
   * @param {function} callback - The callback function to handle the result.
   */
  function addTask(taskDescription, callback)
  {
    db.run('INSERT INTO tasks (description, completed) VALUES (?, ?)', [taskDescription, 'PENDING'], (err) => {
      if (err) {
        console.error('Error adding task:', err.message);
        callback('Error al agregar la tarea: ' + err.message, false);
      } else {
        console.log('Task added successfully');
        callback('Tarea agregada exitosamente', true);
      }
    });
  }

  /**
   * Remove a task from the database.
   * @param {number} taskIndex - The ID of the task to be removed.
   * @param {function} callback - The callback function to handle the result.
   */
  function RemoveTask(taskIndex, callback) {
    db.run('DELETE FROM tasks WHERE id = ?', [taskIndex], (err) => {
      if (err) {
        console.error('Error deleting task:', err.message);
        callback('Error al eliminar la tarea: ' + err.message, false);
      } else {
        console.log('Task deleted successfully');
        callback('Tarea eliminada exitosamente', true);
      }
    });
  }

  /**
   * Retrieves a list of tasks from the database.
   * @param {function} callback - The callback function to handle the result.
   */
  function listTasks(callback) {
    db.all('SELECT * FROM tasks', (err, rows) => {
      if (err) {
        console.error('Error listing tasks:', err.message);
        callback([]);
        return;
      }
  
      const tasks = rows.map((row) => ({
        id: row.id,
        description: row.description,
        completed: row.completed
      }));
  
      callback(tasks);
    });
  }

  /**
   * Updates the status of a task in the database.
   * @param {number} taskIndex - The ID of the task to be updated.
   * @param {string} newStatus - The new status of the task.
   * @param {function} callback - The callback function to handle the result.
   */
  function updateTaskStatus(taskIndex, newStatus, callback) {
    db.run('UPDATE tasks SET completed = ? WHERE id = ?', [newStatus, taskIndex], (err) => {
      if (err) {
        console.error('Error updating task status:', err.message);
        callback({ message: 'Error al actualizar el estado de la tarea', success: false });
        return;
      }
      console.log('Task status updated successfully');
      callback({ message: 'Estado de la tarea actualizado con éxito', success: true });
    });
  }

  module.exports = {
    addTask,
    RemoveTask,
    listTasks,
    updateTaskStatus
  };
});
