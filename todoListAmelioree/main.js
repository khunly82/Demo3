// --------------- //
// ----- DOM ----- //
// --------------- //
const tasksTable = document.getElementById('tasks-table');
const taskForm = document.getElementById('task-form');
const taskNameInput = document.getElementById('task-name-input');
const taskNameHeader = document.getElementById('task-name-header');
const searchInput = document.getElementById('search-input');
const sortIcons = ['fa-sort', 'fa-caret-down', 'fa-caret-up'];

// ------------------- //
// ----- LOGIQUE ----- //
// ------------------- //
const tasks = ['Faire la vaisselle', 'Étudier Javascript', 'Regarder la télévision'];
let nameSort = 0; // 0 -> pas de tri 1-> tri croissant 2 -> tri décroissant

function updateSort() {
    // modifier le tri
    nameSort = (nameSort + 1) % 3;
    renderHTML();
}

function removeTask(t) {
    // retirer une tache de la liste
    const i = tasks.indexOf(t);
    tasks.splice(i, 1);
    renderHTML();
}

function addTask(e) {
    // empecher le rechargement de la page
    e.preventDefault();
    // vérifier que l'input n'est pas vide
    if(!taskNameInput.value.trim()) {
        return;
    }
    // ajouter dans la liste la nouvelle tache
    tasks.push(taskNameInput.value.trim());
    taskNameInput.value = '';
    renderHTML();
}

function applyFilters() {
    // trier en fct de l'ordre
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

    // filtrer en fonction de la valeur de l'input « search »
    toRender = toRender.filter(item => 
        item.toLocaleLowerCase()
            .startsWith(searchInput.value.toLocaleLowerCase())
    );
    
    return toRender;
}

// ------------------------------ //
// ----- RENDER / AFFICHAGE ----- //
// ------------------------------ //

function createRow(task) {
    // création d'une ligne
    const tr = document.createElement('tr');

    // création d'une colonne pour le nom
    const td = document.createElement('td');
    td.textContent = task;

    // création d'une colonne pour les actions
    const tdActions = document.createElement('td');
    tdActions.append(createDeleteButton(task));

    // ajout des 2 colonnes dans la ligne
    tr.append(td, tdActions);
    return tr;
}

function createDeleteButton(task) {
    const button = document.createElement('button');
    button.classList.add('btn-remove');
    button.addEventListener('click', () => removeTask(task));
    const trashIcon = document.createElement('i');
    trashIcon.classList.add('fa', 'fa-trash');
    button.append(trashIcon);
    return button;
}

function renderHTML() {
    // vider la table
    tasksTable.querySelector('tbody').innerHTML = '';
    // appliquer les tris et filtres
    toRender = applyFilters();
    updateHeaderIcon();
    // ajouter les lignes dans la table
    tasksTable.querySelector('tbody').append(...toRender.map(createRow));
}

function updateHeaderIcon() {
    // modifier l'icone du header
    taskNameHeader.querySelector('i.fa').classList.remove(...sortIcons);
    taskNameHeader.querySelector('i.fa').classList.add(sortIcons[nameSort]);
}

// ------------------ //
// ----- EVENTS ----- //
// ------------------ //
taskForm.addEventListener('submit', addTask);
taskNameHeader.addEventListener('click', updateSort);
searchInput.addEventListener('input', renderHTML);

renderHTML();
