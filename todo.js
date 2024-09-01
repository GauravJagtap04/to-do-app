const inputPrio = document.getElementById("priority");
const inputTask = document.getElementById("input-task");
const completedTask = document.getElementById("c1-13");
const submitBtn = document.getElementById("submit-btn");
const outputFldLst = document.getElementById("output-field-list");
const completedOutputFldLst = document.getElementById("output-field-list-completed");

const taskData = JSON.parse(localStorage.getItem("data")) || [];
const completedTaskData = JSON.parse(localStorage.getItem("completed_data")) || [];

let currentTask = {};

const today = new Date();

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
        date: `${today.toLocaleDateString()}`,
        minutes: `${today.toLocaleTimeString()}`,
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
        ({ id, task, priority, date, minutes }) => {
            let priorityColor;
            if (priority === "L") priorityColor = "var(--low-priority)";
            else if (priority === "M") priorityColor = "var(--med-priority)";
            else if (priority === "H") priorityColor = "var(--high-priority)";

            outputFldLst.innerHTML += `
                <li id="${id}">
					<table style="box-shadow: 0px 0px 10px ${priorityColor};" title="${date + " " + minutes}">
						<tr>
							<td>
								<div class="checkbox-wrapper-13">
									<input id="c1-13" type="checkbox" onchange="addCompleted('${id}')">
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

const updateCompletedOutputFldLst = () => {
    if (completedTaskData.length >= 1) {
        completedOutputFldLst.innerHTML = "<h2>Completed tasks</h2>";
    } else {
        completedOutputFldLst.innerHTML = "";
    }

    completedTaskData.forEach(
        ({ id, task, priority, date, minutes }) => {
            let priorityColor;
            if (priority === "L") priorityColor = "var(--low-priority)";
            else if (priority === "M") priorityColor = "var(--med-priority)";
            else if (priority === "H") priorityColor = "var(--high-priority)";

            completedOutputFldLst.innerHTML += `
                <li id="${id}">
					<table style="box-shadow: 0px 0px 10px ${priorityColor};">
						<tr>
							<td style="width: 95%; text-align: center; margin: 0; padding: 0;" title="${minutes}">${task}</td>
							<td style="width: 5%; text-align: right; margin: 0; padding: 0;"><img id="cancel" onclick="deleteCompletedTask('${id}')" src="images/x.png" alt="cancel"></td>
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

const deleteCompletedTask = (taskId) => {
    const dataArrIndex = completedTaskData.findIndex(
        (item) => item.id === taskId
    );

    if (dataArrIndex !== -1) {
        completedTaskData.splice(dataArrIndex, 1);
        document.getElementById(taskId).remove();
        localStorage.setItem("completed_data", JSON.stringify(completedTaskData));
    }

    if (completedTaskData < 1) {
        completedOutputFldLst.innerHTML = "";
    }
};

const addCompleted = (taskId) => {
    const dataArrIndex = taskData.findIndex(item => item.id === taskId);



    if (dataArrIndex !== -1) {
        const completedTaskNew = taskData.splice(dataArrIndex, 1)[0];

        const now = new Date();
        completedTaskNew.date = now.toLocaleDateString();
        completedTaskNew.minutes = now.toLocaleTimeString();

        completedTaskData.unshift(completedTaskNew);

        localStorage.setItem("data", JSON.stringify(taskData));
        localStorage.setItem("completed_data", JSON.stringify(completedTaskData));

        updateOutputFldLst();
        updateCompletedOutputFldLst();
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
    updateCompletedOutputFldLst();
});

updateOutputFldLst();
updateCompletedOutputFldLst();