const taskInput = document.querySelector("form input");
const addTask = document.querySelector("form button");
const listsContainer = document.querySelector("#list-items ul");
const completedStat = document.querySelector("#completed span");
const unCompletedStat = document.querySelector("#uncompleted span");
const completeCount = document.querySelector("#complete-count span");
const removeListContainer = document.getElementById("remove-list-container");
const removeCompleted = document.getElementById("remove-completed");
const removeAllTask = document.getElementById("remove-all");
let checkBoxes = "";
let removeItems = "";

let tasks = [];
let markedCompleted = [];

// Add Task to task list
const addTaskToList = function (e) {
  e.preventDefault();
  const inputVal = taskInput.value;
  if (!inputVal) {
    return;
  }
  // genrate random value for task ID
  let taskId = Math.floor(Math.random() * 1000);
  tasks.push(taskId);
  // add task counts
  completeCount.textContent = tasks.length;
  unCompletedStat.textContent = Number(unCompletedStat.textContent) + 1;
  const list = document.createElement("li");
  list.classList.add("item");
  list.setAttribute("id", `task-${taskId}`);
  list.innerHTML = `
    <div>
    <input data-task-id='${taskId}' type="checkbox" />
    <label>${inputVal}</label>
    </div>
    <div><span data-task-id='${taskId}' class="remove-task">X</span></div>
`;
  listsContainer.append(list);
  removeListContainer.classList.remove("is-hidden");
  taskInput.value = "";
  checkBoxes = document.querySelectorAll("input[type='checkbox']");
  for (let checkbox of checkBoxes) {
    checkbox.addEventListener("click", markCompleted);
  }
  removeItems = document.querySelectorAll(".remove-task");
  for (let removeItem of removeItems) {
    removeItem.addEventListener("click", removeTask);
  }
};

// Mark task as completed
const markCompleted = function (e) {
  let check = e.target;
  let id = check.dataset.taskId;
  if (markedCompleted.includes(id)) {
    check.parentElement.style.textDecoration = "none";
    markedCompleted = markedCompleted.filter((task) => task != id);
    document.getElementById(`task-${id}`).classList.remove("marked-completed");
    // completedStat.textContent = Number(completedStat.textContent) - 1;
    // unCompletedStat.textContent = Number(unCompletedStat.textContent) + 1;
  } else {
    check.parentElement.style.textDecoration = "line-through";
    markedCompleted.push(id);
    document.getElementById(`task-${id}`).classList.add("marked-completed");
    // completedStat.textContent = Number(completedStat.textContent) + 1;
    // unCompletedStat.textContent = Number(unCompletedStat.textContent) - 1;
  }
  updateStats();
};

// Remove the element from dom when we click on remove icon beside the task
const removeTask = function (e) {
  let removeElem = e.target;
  let id = removeElem.dataset.taskId;
  tasks = tasks.filter((task) => task != id);
  if (markedCompleted.includes(id)) {
    markedCompleted = markedCompleted.filter((task) => task != id);
  }
  let elem = document.getElementById(`task-${id}`);
  if (tasks.length == 0) {
    removeListContainer.classList.add("is-hidden");
  }
  elem.remove();
  updateStats();
};

// Will remove all marked tasks
const removeAllCompletedTask = function (e) {
  const allCompletedTasks = document.querySelectorAll(".marked-completed");
  markedCompleted = [];
  allCompletedTasks.forEach((elem) => {
    id = elem.getAttribute("id").split("-")[1];
    tasks = tasks.filter((task) => task != id);
    elem.remove();
  });
  if (tasks.length == 0) {
    removeListContainer.classList.add("is-hidden");
  }
  updateStats();
};

// Remove all tasks from list
const removeAllTasks = function (e) {
  const allTask = document.querySelectorAll(".item");
  allTask.forEach((elem) => {
    elem.remove();
  });
  tasks = [];
  markedCompleted = [];
  removeListContainer.classList.add("is-hidden");
  updateStats();
};

// Will update the stats like all task count, complete task count, uncomplete task count
const updateStats = function () {
  completeCount.textContent = tasks.length;
  completedStat.textContent = markedCompleted.length;
  unCompletedStat.textContent = tasks.length - markedCompleted.length;
};

if (tasks.length == 0) {
  removeListContainer.classList.add("is-hidden");
}

addTask.addEventListener("click", addTaskToList);
removeCompleted.addEventListener("click", removeAllCompletedTask);
removeAllTask.addEventListener("click", removeAllTasks);
