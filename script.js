const input = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");

// Load tasks from localStorage on page load
window.onload = loadTasks;

addBtn.addEventListener("click", addTask);
input.addEventListener("keypress", (e) => {
  if (e.key === "Enter") addTask();
});

function addTask() {
  const taskText = input.value.trim();
  if (taskText === "") return alert("Please enter a task!");

  const task = { text: taskText, completed: false };
  createTaskElement(task);
  saveTask(task);
  input.value = "";
}

function createTaskElement(task) {
  const li = document.createElement("li");
  if (task.completed) li.classList.add("completed");

  li.innerHTML = `
    <span>${task.text}</span>
    <div class="action-btns">
        <button class="complete" style="background: green;">✔</button>
        <button class="delete" style="background: red;">✘</button>
    </div>
  `;

  li.querySelector(".complete").addEventListener("click", () => {
    li.classList.toggle("completed");
    updateLocalStorage();
  });

  li.querySelector(".delete").addEventListener("click", () => {
    li.remove();
    updateLocalStorage();
  });

  taskList.appendChild(li);
}

function saveTask(task) {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.push(task);
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.forEach((task) => createTaskElement(task));
}

function updateLocalStorage() {
  const tasks = [];
  taskList.querySelectorAll("li").forEach((li) => {
    tasks.push({
      text: li.querySelector("span").textContent,
      completed: li.classList.contains("completed"),
    });
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}
