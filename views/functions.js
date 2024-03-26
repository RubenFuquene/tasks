// Get references to elements
const addButton = document.getElementById("add-button");
const taskInput = document.getElementById("task-input");
const deleteButtons = document.querySelectorAll(".delete-button");
const statusButtons = document.querySelectorAll(".status-button");

// Add click event listener to the "Add" button
addButton.addEventListener("click", () => {
  const taskDescription = taskInput.value.trim();
  if (taskDescription !== "") {
    addTaskToServer(taskDescription);
  }
});

// Add click event listeners to "Delete" buttons
deleteButtons.forEach(button => {
  button.addEventListener("click", () => {
    const taskId = button.getAttribute("data-task-id");
    removeTaskFromServer(taskId);
  });
});

// Add click event listeners to "Status" buttons
statusButtons.forEach(button => {
  button.addEventListener("click", () => {
    const taskId = button.getAttribute("data-task-id");
    const newStatus = button.getAttribute("data-status");
    updateTaskStatusOnServer(taskId, newStatus);
  });
});

// Function to add a task to the server
function addTaskToServer(description) {
  fetch("/add-task", {
    method: "POST",
    headers: {
        "Content-Type": "application/x-www-form-urlencoded",
    },
    body: `taskDescription=${encodeURIComponent(description)}`,
  })
  .then(response => response.json())
  .then(data => {
    alert(data.message);
    if (data.success) {
      location.reload();
    }
  })
  .catch(error => {
    console.error("Error al agregar tarea:", error);
  });
}

// Function to remove a task from the server
function removeTaskFromServer(taskId) {
  fetch("/remove-task", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: `taskIndex=${encodeURIComponent(taskId)}`,
  })
  .then(response => response.json())
  .then(data => {
    alert(data.message);
    if (data.success) {
      location.reload();
    }
  })
  .catch(error => {
    console.error("Error al eliminar tarea:", error);
  });
}

// Function to update the status of a task on the server
function updateTaskStatusOnServer(taskId, newStatus) {
  fetch("/update-task-status", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: `taskId=${encodeURIComponent(taskId)}&newStatus=${encodeURIComponent(newStatus)}`,
  })
  .then(response => response.json())
  .then(data => {
    alert(data.message);
    if (data.success) {
      location.reload();
    }
  })
  .catch(error => {
    console.error("Error al actualizar estado de tarea:", error);
  });
}