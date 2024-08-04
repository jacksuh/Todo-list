document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('taskInput');
    const addTaskButton = document.getElementById('addTaskButton');
    const taskList = document.getElementById('taskList');

    setInterval(updateTime, 1000);

    function updateTime() {
        const now = new Date();
        const formattedDateTime = formatDateTime(now);
        timeDisplay.textContent = formattedDateTime;
    }

    function formatDateTime(dateTime) {
        const day = String(dateTime.getDate()).padStart(2, '0');
        const month = String(dateTime.getMonth() + 1).padStart(2, '0'); // Janeiro é 0
        const year = dateTime.getFullYear();
        const hours = String(dateTime.getHours()).padStart(2, '0');
        const minutes = String(dateTime.getMinutes()).padStart(2, '0');
        const seconds = String(dateTime.getSeconds()).padStart(2, '0');
        return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
    }

    // Carregar tarefas do localStorage ao carregar a página
    loadTasks();

    addTaskButton.addEventListener('click', addTask);
    taskList.addEventListener('click', manageTasks);

    function addTask() {
        const taskText = taskInput.value.trim();
        if (taskText === '') return;

        const li = document.createElement('li');
        li.innerHTML = `
            <input type="checkbox" class="checkbox">
            <span class="task-text">${taskText}</span>
            <span class="delete">x</span>
        `;
        taskList.appendChild(li);

        taskInput.value = '';
        saveTasks();
    }

    function manageTasks(event) {
        if (event.target.classList.contains('delete')) {
            event.target.parentElement.remove();
            saveTasks();
        } else if (event.target.classList.contains('checkbox')) {
            event.target.nextElementSibling.classList.toggle('completed');
            saveTasks();
        }
    }

    function saveTasks() {
        const tasks = [];
        document.querySelectorAll('#taskList li').forEach(task => {
            tasks.push({
                text: task.querySelector('.task-text').textContent,
                completed: task.querySelector('.checkbox').checked
            });
        });
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    function loadTasks() {
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks.forEach(task => {
            const li = document.createElement('li');
            li.innerHTML = `
                <input type="checkbox" class="checkbox" ${task.completed ? 'checked' : ''}>
                <span class="task-text ${task.completed ? 'completed' : ''}">${task.text}</span>
                <span class="delete">x</span>
            `;
            taskList.appendChild(li);
        });
    }
});
