let userId;
let taskId;
let taskNameField;
let taskDueDateField;
let taskDescriptionField;
let courseNameField;

window.onload = initial;

function initial() {
    taskId = sessionStorage.getItem('taskid');
    taskNameField = document.getElementById('task-name');
    taskDueDateField = document.getElementById('task-due-date');
    taskDescriptionField = document.getElementById('task-description');
    courseNameField = document.getElementById('course-name');

    fillHtml();

    document.getElementById('cancel-button').onclick = previousPage;
    document.getElementById('confirm-button').onclick = updateTaskFirebase;
}

function fillHtml() {
    firebase.auth().onAuthStateChanged(function (user) {
        userId = user.uid; // Reason for this is so we could use it in updateTaskFirebase()
        db.collection("users")
            .doc(user.uid)
            .collection("tasks")
            .doc(taskId)
            .onSnapshot(
                function (snap) {
                    taskNameField.value = snap.data()['task-name'];
                    taskDueDateField.value = snap.data()['task-due-date'];
                    taskDescriptionField.value = snap.data()['task-description'];
                    courseNameField.value = snap.data()['course-name'];
                }
            );
    });
}

function updateTaskFirebase() {
    db.collection("users")
        .doc(userId)
        .collection("tasks")
        .doc(taskId)
        .update({
            "task-name": taskNameField.value,
            "task-due-date": taskDueDateField.value,
            "task-description": taskDescriptionField.value,
            "course-name": courseNameField.value,
        })
        .then(previousPage);
}

function previousPage() {
    window.location.assign("main.html");
}