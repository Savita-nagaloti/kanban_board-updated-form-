// Function to handle adding a new task
function addTask() {
    const input = document.getElementById('taskInput');
    const val = input.value.trim();
    if (val === "") return;

    const taskID = "task-" + Date.now();
    const taskEl = document.createElement('div');
    taskEl.className = 'task';
    taskEl.id = taskID;
    taskEl.draggable = true;
    taskEl.ondragstart = drag;

    taskEl.innerHTML = `
        <span class="task-text">${val}</span>
        <div class="task-actions">
            <button class="btn-edit" onclick="editTask('${taskID}')">Edit</button>
            <button class="btn-del" onclick="deleteTask('${taskID}')">Delete</button>
        </div>
    `;

    document.querySelector('#todo .task-list').appendChild(taskEl);
    input.value = "";
}

// DRAG AND DROP LOGIC
function allowDrop(ev) {
    ev.preventDefault();
}

function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
}

function drop(ev) {
    ev.preventDefault();
    const data = ev.dataTransfer.getData("text");
    const draggedElement = document.getElementById(data);
    
    // Ensure it drops into the task-list div
    let target = ev.target;
    while (target && !target.classList.contains('task-list')) {
        target = target.parentElement;
    }
    
    if (target) {
        target.appendChild(draggedElement);
    }
}

// EDIT AND DELETE LOGIC
function editTask(id) {
    const taskEl = document.getElementById(id);
    const textSpan = taskEl.querySelector('.task-text');
    const newText = prompt("Update task:", textSpan.innerText);
    if (newText !== null && newText.trim() !== "") {
        textSpan.innerText = newText;
    }
}

function deleteTask(id) {
    if (confirm("Delete this task?")) {
        document.getElementById(id).remove();
    }
}