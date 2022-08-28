const valueInput = document.getElementById('inputValue');
const taskList = document.querySelector('.tasks-List ul');
const message = document.querySelector('.tasks-List');


let tasks = [];


let info_mesage = {
    errors: 'The Field is required...',
    success: "Your request has been successfully added to the list.",
}

function eventListeners() {
    document.addEventListener('DOMContentLoaded', () => {
        tasks = JSON.parse(localStorage.getItem('tasks'));
        createHTML();
    });
    taskList.addEventListener('click', removeButton);
}


function removeButton(e) {
    if (e.target.tagName == 'SPAN') {
        const deleteId = parseInt(e.target.getAttribute('id'));
        tasks = tasks.filter(task => task.id !== deleteId);
        createHTML();
    }
}


function newElement() {
    const task = valueInput.value;
    if (task === '') {
        showMessageFunction(info_mesage.errors);
        $(".error").toast("show");
        return;
    }
    $(".success").toast("show");
    showSuccessMessageFunction(info_mesage.success);
    const taskObject = {
        task,
        id: Date.now(),

    }
    tasks = [...tasks, taskObject]
    createHTML();
    valueInput.value = "";
}


function createHTML() {
    clearHTML();
    if (tasks.length > 0) {
        tasks.forEach(task => {
            const liDOM = document.createElement('li');
            liDOM.innerHTML = `${task.task}`;
            let closeButton = document.createElement("span");
            closeButton.textContent = "\u00D7";
            closeButton.classList.add("close");
            closeButton.onclick = removeButton;
            closeButton.setAttribute('id', `${task.id}`);
            liDOM.onclick = check;
            liDOM.append(closeButton);
            taskList.appendChild(liDOM);
        });
    }
    syncronizationStorage();
}

function syncronizationStorage() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function clearHTML() {
    taskList.innerHTML = '';
}
function deleteAll() {
    tasks = [];
    createHTML();
}
function check() {
    this.classList.toggle("checked"); 
}
function showMessageFunction(error) {
       
    const messageError = document.createElement('p');
    messageError.textContent = error;
    messageError.classList.add('error-1');

    message.appendChild(messageError);

    setTimeout(() => {
        messageError.remove();
    }, 2000);
}

function showSuccessMessageFunction(error) {
       
    const messageError = document.createElement('p');
    messageError.textContent = error;
    messageError.classList.add('error-2');

    message.appendChild(messageError);

    setTimeout(() => {
        messageError.remove();
    }, 2000);
}


