const inputPrio = document.getElementById("priority");
const inputTask = document.getElementById("input-task");
const submitBtn = document.getElementById("submit-btn");
const outputFldLst = document.getElementById("output-field-list");

const taskData = JSON.parse(localStorage.getItem("data")) || [];
let currentTask = {};

const addTask = () => {
    const taskValue = inputTask.value.trim();
    const priorityValue = inputPrio.value;

    if (!taskValue || !priorityValue) {
        alert("Please enter a task and select a priority.");
        return;
    }

    const taskObj = {
        id: `${taskValue.toLowerCase().split(" ").join("-")}-${Date.now()}`,
        task: taskValue,
        priority: priorityValue,
    };

    const dataArrIndex = taskData.findIndex((item) => item.id === currentTask.id);

    if (dataArrIndex === -1) {
        taskData.unshift(taskObj);
    } else {
        taskData[dataArrIndex] = taskObj;
    }

    localStorage.setItem("data", JSON.stringify(taskData));
    updateOutputFldLst();

    inputTask.value = "";
    inputPrio.value = "";
};

const updateOutputFldLst = () => {
    outputFldLst.innerHTML = "";

    taskData.forEach(
        ({ id, task, priority }) => {
            let priorityColor;
            if (priority === "L") priorityColor = "var(--low-priority)";
            else if (priority === "M") priorityColor = "var(--med-priority)";
            else if (priority === "H") priorityColor = "var(--high-priority)";

            outputFldLst.innerHTML += `
                <li id="${id}">
					<table style="box-shadow: 0px 0px 10px ${priorityColor};">
						<tr>
							<td>
								<div class="checkbox-wrapper-13">
									<input id="c1-13" type="checkbox">
								</div>
							</td>
							<td>${task}</td>
							<td><img id="cancel" onclick="deleteTask('${id}')" src="images/x.png" alt="cancel"></td>
						</tr>
					</table>
				</li>
            `;
        }
    );
};

const deleteTask = (taskId) => {
    const dataArrIndex = taskData.findIndex(
        (item) => item.id === taskId
    );

    if (dataArrIndex !== -1) {
        taskData.splice(dataArrIndex, 1);
        document.getElementById(taskId).remove();
        localStorage.setItem("data", JSON.stringify(taskData));
    }
};

document.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        e.preventDefault();
        addTask();
    }
});

submitBtn.addEventListener('click', (e) => {
    e.preventDefault();
    addTask();
});

document.addEventListener('DOMContentLoaded', () => {
    updateOutputFldLst();
});

updateOutputFldLst();
