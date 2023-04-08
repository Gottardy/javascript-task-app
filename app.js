document.getElementById('formTask').addEventListener('submit', (e)=>{
    e.preventDefault();
    
    const title = document.getElementById('title');
    const description = document.getElementById('description');
    
    if(!title.value.trim() || !description.value.trim()) {
        return;
    }

    const Task = {
        title:title.value.trim(),
        description:description.value.trim()
    };

    addTaskToList(Task);
    document.getElementById('formTask').reset();

})

/**
 * Agrega una nueva tarea a la lista de tareas.
 * Si la lista de tareas es null, undefined o vacía, se crea una nueva lista vacía.
 * @param {Object} task - Un objeto que representa una tarea, debe tener las propiedades "title" y "description".
 * @returns {void}
 */
function addTaskToList(task) {
    // Obtenemos la lista de tareas
    let listTasks = getTasks();

    // Si la lista de tareas es null, undefined o vacía, se crea una nueva lista vacía.
    if (listTasks === null || listTasks === undefined || listTasks.length === 0) {
        listTasks = [];
    }

    // Agregamos la nueva tarea a la lista de tareas
    listTasks.push(task);

    // Guardamos la lista de tareas actualizada en el almacenamiento local
    saveTask(listTasks); 

    // Mostramos la lista de tareas actualizada en el navegador
    showTasks(listTasks);
}


/**
 * Guarda la lista de tareas en el almacenamiento local como una cadena JSON.
 * @param {Object[]} tasks - Un arreglo de objetos que representan tareas, cada objeto debe tener las propiedades "title" y "description".
 * @returns {void}
 */
function saveTask( tasks ){
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

/**
 * Obtiene la lista de tareas almacenada en el almacenamiento local y la convierte en un arreglo de objetos.
 * @returns {Object[] | null} - Un arreglo de objetos que representan tareas, cada objeto tiene las propiedades "title" y "description".
 * Si no hay tareas almacenadas en el almacenamiento local, devuelve null.
 */
function getTasks(){
    const tasks = JSON.parse(localStorage.getItem('tasks'));
    return tasks;
}

/**
 * Muestra la lista de tareas en el navegador, en un contenedor con el id "task".
 * @param {Object[]} listTasks - Un arreglo de objetos que representan tareas, cada objeto debe tener las propiedades "title" y "description".
 * @returns {void}
 */
function showTasks(listTasks) {
    // Obtener el elemento del DOM con el id "task"
    const viewListTasks = document.getElementById('task');
    // Limpiar el contenido del elemento
    viewListTasks.innerHTML = '';

    // Recorrer el arreglo de tareas y agregar cada tarea como un elemento HTML al elemento "viewListTasks"
    listTasks.forEach(task => {
        // Obtener el título de la tarea actual
        const viewTitle = task.title;
        // Obtener la descripción de la tarea actual
        const viewDesc = task.description;
        // Agregar un elemento HTML que muestra el título y la descripción de la tarea actual, y un botón para eliminarla
        viewListTasks.innerHTML += `
        <div class="card mb-3">
            <div class="card-body">
                <p>${viewTitle}</p>
                <p>${viewDesc}</p>
                <a class="btn btn-danger" onclick="deleteTask('${viewTitle}')" >Delete</a>
            </div>
        </div>
        `;
    });
}


/**
 * Elimina una tarea de la lista de tareas.
 * @param {string} title - El título de la tarea a eliminar.
 * @returns {void}
 */
function deleteTask(title) {
    let list = getTasks();
    const index = list.findIndex(e => e.title === title);
    if (index !== -1) {
      list.splice(index, 1);
      localStorage.setItem('tasks', JSON.stringify(list));
    }
    showTasks(list);
  }
  