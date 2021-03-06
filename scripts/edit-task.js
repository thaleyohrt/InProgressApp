let userId;
let taskId;
let taskNameField;
let taskDueDateField;
let taskDescriptionField;
let courseNameField;

// Wait until the window loads to begin.
window.onload = initial;

/**
 * Gets the information from the page that user inputs.
 */
function initial() {
    taskId = sessionStorage.getItem('taskid');
    taskNameField = document.getElementById('task-name');
    taskDueDateField = document.getElementById('task-due-date');
    taskDescriptionField = document.getElementById('task-description');
    courseNameField = document.getElementById('course-name');

    fillHtml();

    document.getElementById('cancel-button').onclick = previousPage;
    document.getElementById('confirm-button').onclick = function () {
        if (taskNameField.value !== '') {
            updateTaskFirebase();
        } else {
            alert('Must fill in Task Name');
        }
    }
}

/**
 * Fills the boxes with the information of the task the user clicked.
 */
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

/**
 * Update the database with the new information.
 */
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

/**
 * Take the user back to the main page.
 */
function previousPage() {
    window.location.assign("main.html");
}