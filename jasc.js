// Initialize counts on load
updateCounts();

function addTask() {
    const input = document.getElementById('taskInput');
    const priority = document.getElementById('priorityInput');
    const val = input.value.trim();
    
    if (val === "") {
        alert("Please enter a task title.");
        return;
    }

    const taskID = "task-" + Date.now();
    const taskEl = document.createElement('div');
    taskEl.className = 'task';
    taskEl.id = taskID;
    taskEl.draggable = true;
    
    // Event listeners for dragging
    taskEl.addEventListener('dragstart', dragStart);
    taskEl.addEventListener('dragend', dragEnd);

    taskEl.innerHTML = `
        <div class="priority-tag ${priority.value.toLowerCase()}">${priority.value}</div>
        <div class="task-text">${val}</div>
        <div class="task-actions">
            <button class="btn-edit" onclick="editTask('${taskID}')">Edit</button>
            <button class="btn-del" onclick="deleteTask('${taskID}')">Delete</button>
        </div>
    `;

    document.querySelector('#todo .task-list').appendChild(taskEl);
    input.value = "";
    updateCounts();
}

// DRAG AND DROP HANDLERS
function dragStart(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
    setTimeout(() => ev.target.classList.add('dragging'), 0);
}

function dragEnd(ev) {
    ev.target.classList.remove('dragging');
    updateCounts();
}

function allowDrop(ev) {
    ev.preventDefault();
}

function dragEnter(ev) {
    ev.preventDefault();
    if (ev.target.classList.contains('task-list')) {
        ev.target.parentElement.classList.add('drag-over');
    }
}

function dragLeave(ev) {
    if (ev.target.classList.contains('task-list')) {
        ev.target.parentElement.classList.remove('drag-over');
    }
}

function drop(ev) {
    ev.preventDefault();
    const data = ev.dataTransfer.getData("text");
    const draggedElement = document.getElementById(data);
    
    let targetList = ev.target;
    // Ensure we find the task-list container
    while (targetList && !targetList.classList.contains('task-list')) {
        targetList = targetList.parentElement;
    }
    
    if (targetList) {
        targetList.appendChild(draggedElement);
        targetList.parentElement.classList.remove('drag-over');
    }
    updateCounts();
}

// UTILITIES
function updateCounts() {
    const columns = ['todo', 'inprogress', 'done'];
    columns.forEach(colId => {
        const count = document.querySelectorAll(`#${colId} .task`).length;
        document.querySelector(`#${colId} .count`).innerText = count;
    });
}

function editTask(id) {
    const taskEl = document.getElementById(id);
    const textDiv = taskEl.querySelector('.task-text');
    const newText = prompt("Update task title:", textDiv.innerText);
    if (newText !== null && newText.trim() !== "") {
        textDiv.innerText = newText;
    }
}

function deleteTask(id) {
    if (confirm("Are you sure you want to delete this task?")) {
        document.getElementById(id).remove();
        updateCounts();
    }
}