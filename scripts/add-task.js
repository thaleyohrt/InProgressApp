let taskNameField;
let taskDueDateField;
let taskDescriptionField;
let courseNameField;

// Wait until the window loads to run things.
window.onload = initial;

/**
 * Get the information from the fields that the user has inputted.
 */
function initial() {
    taskNameField = document.getElementById('task-name');
    taskDueDateField = document.getElementById('task-due-date');
    taskDescriptionField = document.getElementById('task-description');
    courseNameField = document.getElementById('course-name');

    document.getElementById('cancel-button').onclick = previousPage;
    document.getElementById('confirm-button').onclick = function () {
        if (taskNameField.value !== '') {
            addTaskFirebase();
        } else {
            alert('Must fill in Task Name');
        }
    }
}

/**
 * Adds information to correct databse location.
 */
function addTaskFirebase() {
    firebase.auth().onAuthStateChanged(function (user) {
        taskObj = {
            "task-name": taskNameField.value,
            "task-due-date": taskDueDateField.value,
            "task-description": taskDescriptionField.value,
            "course-name": courseNameField.value,
        }
        db.collection("users")
            .doc(firebase.auth().currentUser.uid)
            .collection("tasks")
            .add(taskObj)
            .then(previousPage);
    });
}

/**
 * Takes use back to the main page.
 */
function previousPage() {
    window.location.assign("main.html");
}