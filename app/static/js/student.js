// app/static/js/student.js

// Example of form validation for student registration
function validateStudentForm(event) {
    event.preventDefault();
    let studentName = document.getElementById('student-name').value;
    let studentEmail = document.getElementById('student-email').value;
    
    if (!studentName || !studentEmail) {
        alert('Please fill out all fields.');
        return;
    }

    // If validation passes, submit the form
    submitForm(event, 'studentForm', '/student/register');
}

// Function to display student's grades or results
function showStudentGrades(studentId) {
    fetch(`/student/grades/${studentId}`, {
        method: 'GET'
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            displayStudentGrades(data.grades);
        } else {
            alert('Unable to fetch grades.');
        }
    })
    .catch(error => console.error('Error:', error));
}

function displayStudentGrades(grades) {
    let gradesContainer = document.getElementById('grades-container');
    gradesContainer.innerHTML = '';  // Clear previous grades

    grades.forEach(grade => {
        let gradeElement = document.createElement('div');
        gradeElement.classList.add('grade');
        gradeElement.innerHTML = `${grade.subject}: ${grade.score}`;
        gradesContainer.appendChild(gradeElement);
    });
}
