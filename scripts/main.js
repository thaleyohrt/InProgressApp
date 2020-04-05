window.onload = updateHtml;

function updateHtml() {
    firebase.auth().onAuthStateChanged(function (user) {
        db.collection("users")
            .doc(user.uid)
            .collection("tasks")
            .get()
            .then(function (querySnapshot) {
                querySnapshot.forEach(function (doc) {
                    // doc.data() is never undefined for query doc snapshots
                    console.log(doc.id, " => ", doc.data()); // Feel free to delete this

                    let courseName = doc.data()['course-name'];
                    let taskName = doc.data()['task-name'];
                    let taskDueDate = doc.data()['task-due-date'];
                    let taskDescription = doc.data()['task-description'];
                    let courseName = doc.data()['course-name'];
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
    sessionStorage.setItem('taskid', docid);
    window.location.assign('edit-task.html');
}