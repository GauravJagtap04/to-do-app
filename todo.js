const inputPrio = document.getElementById("priority");
const inputTask = document.getElementById("input-task");
const submitBtn = document.getElementById("submit-btn");
const outputFld = document.getElementById("output-field");
const outputFldLst = document.getElementById("output-field-list");

let todoArr = [];

const submit = (event) => {
    event.preventDefault();
    addTask(inputTask.value);
};

const addTask = (item) = {
    if (item !== '') {
        const task = {
            id: Date.now(),
            priority: priority,
            todotask: item,
            completed: false
        };

        todoArr.push(task);
        renderTask(todoArr);

        todoInput.value = "";
    } else {
        alert("Enter task");
    }
};


const renderTask = (todoArr) = {
    outputFldLst.innerHTML = '';

    todoArr.forEach(item => {
        const checked = item.completed ? 'checked' : null;

        const li = document.createElement('li');
        li.setAttribute('class', 'item');
        li.setAttribute('data-key', item.id);
        if (items.completed === true) {
            li.classList.add('checked');
        }
        li.innerHTML = `
            <input type="checkbox" class="checkbox" ${checked}>
            ${item.name}
            <button class="delete-button">X</button>
        `;
        outputFldLst.append(li);
    });
};