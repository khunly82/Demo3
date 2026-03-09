// constantes et variables
// Logique
const tasks = ['Faire la vaisselle', 'Étudier Javascript', 'Regarder la télévision'];
let nameSort = 0; // 0 -> pas de tri 1-> tri croissant 2 -> tri décroissant

// DOM
const tasksTable = document.getElementById('tasks-table');
const taskForm = document.getElementById('task-form');
const taskNameInput = document.getElementById('task-name-input');
const taskNameHeader = document.getElementById('task-name-header');
const searchInput = document.getElementById('search-input');

// RENDER / AFFICHAGE
function createRow(task) {
    const tr = document.createElement('tr');

    const td = document.createElement('td');
    td.textContent = task;

    const tdRemove = document.createElement('td');
    const button = document.createElement('button');
    button.textContent = 'X';
    button.addEventListener('click', () => removeTask(task));
    tdRemove.append(button);

    tr.append(td, tdRemove);
    return tr;
}

function renderHTML() {
    tasksTable.querySelector('tbody').innerHTML = '';
    toRender = applyFilters();
    tasksTable.querySelector('tbody').append(...toRender.map(createRow));
}

function applyFilters() {
    let toRender = tasks.toSorted(((item1, item2) => {
        if(nameSort === 0) {
            return 1;
        } 
        else if(nameSort === 1) {
            return item1.localeCompare(item2);
        }
        else {
            return item2.localeCompare(item1);
        }
    }));

    toRender = toRender.filter(item => item.toLocaleLowerCase()
        .startsWith(searchInput.value.toLocaleLowerCase()));

    return toRender;
}

// EVENTS
taskForm.addEventListener('submit', e => {
    // empecher le rechargement de la page
    e.preventDefault();
    if(!taskNameInput.value.trim()) {
        return;
    }
    tasks.push(taskNameInput.value);
    taskNameInput.value = '';
    renderHTML();
});

taskNameHeader.addEventListener('click', () => {
    nameSort = (nameSort + 1) % 3;
    renderHTML();
});

function removeTask(t) {
    const i = tasks.indexOf(t);
    tasks.splice(i, 1);
    renderHTML();
}

searchInput.addEventListener('input', renderHTML);

renderHTML();
