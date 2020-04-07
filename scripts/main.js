let clickTaskTo = 'edit';

window.onload = initial;

function initial() {
    let toggle = document.getElementById('edit-delete-toggle');
    toggle.onclick = function () {
        if (clickTaskTo === 'edit') {
            clickTaskTo = 'delete';
            toggle.className = 'btn btn-danger';
            toggle.innerHTML = 'Clicking Task: Deletes';
        } else if (clickTaskTo === 'delete') {
            clickTaskTo = 'edit';
            toggle.className = 'btn btn-info';
            toggle.innerHTML = 'Clicking Task: Edits';
        }
    }

    updateHtml();
}

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

function createTaskElement(docid, courseName, taskName, taskDueDate, taskDescription, courseName) {
    let task = document.createElement('A');
    task.className = 'list-group-item list-group-item-action flex-column align-items-start';
    task.onclick = function () {
        handleTaskClicked(docid);
    };

    task.innerHTML =
        '<div class="d-flex w-100 justify-content-between">' +
        '<h5 class="mb-1">' + taskName + '</h5>' +
        '<small class="text-muted">Due ' + taskDueDate + '</small>' +
        '</div>' +
        '<p class="mb-1">' + taskDescription + '</p>' +
        '<small class="text-muted">' + courseName + '</small>'

    let taskList = document.getElementById('task-list');
    let addTaskButton = document.getElementById('add-task-button');
    taskList.insertBefore(task, addTaskButton);
}

function handleTaskClicked(docid) {
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
                    location.reload();
                });
        });
    }
}