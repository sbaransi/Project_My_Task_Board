
const taskForm = document.getElementById('form-group')
const taskDescription = document.getElementById('task-Description')
const taskDate = document.getElementById('task-Date')
const taskTime = document.getElementById('task-Time')
// const taskImageNote = document.getElementById('task-Image')
const addTasktBtn = document.getElementById('addTaskButton')
const resetFormBtn = document.getElementById('resetFormButton')
const deleteTaskBtn = document.getElementById('deleteBtn')
const taskList = document.getElementById('taskList')


let tasks = [];

//get from local storage
tasks = JSON.parse(localStorage.getItem('tasksStorageList')) || [];

//save local storage
function saveTasksToLocalStorage() {
    localStorage.setItem('tasksStorageList', JSON.stringify(tasks));
}

// From reset 
function formReset() {
    taskDescription.value = '';
    taskDate.value = '';
    taskTime.value = '';
}

//Display Product
function displayTasksList(tasks) {
    if (!Array.isArray(tasks)) return;
    taskList.innerHTML = '';
    tasks.forEach((task, index) => { // Correct forEach syntax
        const card = document.createElement('div');

        card.innerHTML = `       
    <div class="col-md-10 mb-3">
    <div class="row">
        <div class="card">      
            <div class="card-body">
            <i class="bi bi-file-x-fill deleteBtnPointer" id="deleteBtn" data-index="${index}""></i>             
                <p class="card-text"><strong>${task.description}</strong></p>
                <p class="card-date"><strong>${task.date}</strong></p> 
                <p class="card-time"><strong>${task.time}</strong></p>
                                                       
            </div>
        </div>
    </div>          
        `;
       
        taskList.appendChild(card); // Append the row to the table body
         // Add a class for the initial state
         card.classList.add('card-initial');
        // Trigger the transition after a short delay
        setTimeout(() => {
            card.classList.remove('card-initial');
        }, 10000); // Adjust delay as needed
    });
}

// ADD task to local storage and show on screen
addTasktBtn.addEventListener('click', () => {

    const task = {
        
        description: taskDescription.value,
        date: taskDate.value,
        time: taskTime.value,
    }
    if (task.description && task.date && task.time) {
        tasks.push(task);

    } else {
        alert('Enter all data');
    }
    saveTasksToLocalStorage();
    displayTasksList(tasks);
});

resetFormBtn.addEventListener('click', () => {
    formReset();
});


taskList.addEventListener('click', (event) => {
    if (event.target.classList.contains('deleteBtnPointer')) {
        const index = parseInt(event.target.dataset.index);
        tasks.splice(index, 1);
        saveTasksToLocalStorage();
        taskList.innerHTML = '';
        displayTasksList(tasks);
    }
});


displayTasksList(tasks);