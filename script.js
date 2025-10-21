const input = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");

addBtn.addEventListener("click",addTask);
input.addEventListener("keypress", (e) => {
    if (e.key === "Enter") addTask();
});

function addTask() {
    const taskText = input.value.trim();
    if (taskText === "") return alert("Please Enter a task!");

    const li = document.createElement("li");
    li.innerHTML = `
    <span>${taskText}</span>
    <div>
        <button class = "complete"></button>
    </div>
    `;


    li.querySelector(".complete").addEventListener(
        "click", () => {
            li.classList.toggle("completed");
        });

    li.querySelector(".delelte").addEventListener(
        "click", () => {
            li.remove();
        });

        taskList.appendChild(li);
        input.value = "";
}