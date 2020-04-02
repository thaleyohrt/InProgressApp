let taskNameField;
let taskDueDateField;
let taskDescriptionField;

window.onload = initial;

function initial() {
    taskNameField = document.getElementById('task-name');
    taskDueDateField = document.getElementById('task-due-date');
    taskDescriptionField = document.getElementById('task-description');

    document.getElementById('cancel-button').onclick = previousPage;
    document.getElementById('confirm-button').onclick = addTaskFirebase;
}

function addTaskFirebase() {
    firebase.auth().onAuthStateChanged(function (user) {
        taskObj = {
            "task-name": taskNameField.value,
            "task-due-date": taskDueDateField.value,
            "task-description": taskDescriptionField.value
        }
        db.collection("users")
            .doc(firebase.auth().currentUser.uid)
            .collection("tasks")
            .add(taskObj)
            .then(previousPage);
    });
}

function previousPage() {
    window.location.assign("main.html");
}