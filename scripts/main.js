let clickTaskTo = 'edit';

// Wait until the page loads before starting
window.onload = initial;

/**
 * Sets up the main page template.
 */
function initial() {
    let toggle = document.getElementById('edit-delete-toggle');
    let background = document.getElementById('task-list-background');
    toggle.onclick = function () {
        if (clickTaskTo === 'edit') {
            clickTaskTo = 'delete';
            toggle.className = 'btn btn-danger';
            toggle.innerHTML = 'Clicking Task: Deletes';
            background.style.backgroundColor = '#dc3545';
        } else if (clickTaskTo === 'delete') {
            clickTaskTo = 'edit';
            toggle.className = 'btn btn-info';
            toggle.innerHTML = 'Clicking Task: Edits';
            background.style.backgroundColor = '#17a2b8';
        }
    }

    updateHtml();
}

/**
 * Updates the page with the user's database information.
 */
function updateHtml() {
    firebase.auth().onAuthStateChanged(function (user) {
        db.collection("users")
            .doc(user.uid)
            .collection("tasks")
            .get()
            .then(function (querySnapshot) {
                querySnapshot.forEach(function (doc) {
                    let courseName = doc.data()['course-name'];
                    let taskName = doc.data()['task-name'];
                    let taskDueDate = doc.data()['task-due-date'];
                    let taskDescription = doc.data()['task-description'];
                    createTaskElement(doc.id, courseName, taskName, taskDueDate, taskDescription, courseName);
                });
            });
    });
}

/**
 * Adds a newly created task to the page.
 * 
 * @param {string} docid 
 * @param {string} courseName 
 * @param {string} taskName 
 * @param {string} taskDueDate 
 * @param {string} taskDescription 
 * @param {string} courseName 
 */
function createTaskElement(docid, courseName, taskName, taskDueDate, taskDescription, courseName) {
    let task = document.createElement('A');
    task.className = 'list-group-item list-group-item-action flex-column align-items-start';
    task.onclick = function (event) {
        handleTaskClicked(docid, event.currentTarget);
    };

    // Makes sure the word 'Due' is added only if there is a due date.
    if (taskDueDate !== '') {
        taskDueDate = 'Due: ' + taskDueDate;
    }

    task.innerHTML =
        '<div class="d-flex w-100 justify-content-between">' +
        '<h5 class="mb-1">' + taskName + '</h5>' +
        '<small class="text-muted">' + taskDueDate + '</small>' +
        '</div>' +
        '<p class="mb-1">' + taskDescription + '</p>' +
        '<small class="text-muted">' + courseName + '</small>'

    let taskList = document.getElementById('task-list');
    let addTaskButton = document.getElementById('add-task-button');
    taskList.insertBefore(task, addTaskButton);
}

/**
 * Either takes you to edit or delete a task when clicked.
 * 
 * @param {string} docid 
 * @param {string} taskElement 
 */
function handleTaskClicked(docid, taskElement) {
    if (clickTaskTo === 'edit') {
        sessionStorage.setItem('taskid', docid);
        window.location.assign('edit-task.html');

    } else if (clickTaskTo === 'delete') {
        firebase.auth().onAuthStateChanged(function (user) {
            db.collection("users")
                .doc(user.uid)
                .collection("tasks")
                .doc(docid)
                .delete()
                .then(function () {
                    taskElement.remove();
                });
        });
    }
}