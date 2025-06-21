// This file handles admin functionalities, such as viewing students and updating grades.

document.addEventListener("DOMContentLoaded", function () {
  const studentList = document.getElementById("student-list");
  const updateGradeForm = document.getElementById("update-grade-form");
  const gradeInput = document.getElementById("grade-input");
  const studentSelect = document.getElementById("student-select");

  // Fetch and display registered students
  function fetchStudents() {
    fetch("/api/admin/students")
      .then((response) => response.json())
      .then((data) => {
        studentList.innerHTML = "";
        data.forEach((student) => {
          const listItem = document.createElement("li");
          listItem.textContent = `${student.firstName} ${student.otherNames} - Index: ${student.indexNumber}`;
          studentList.appendChild(listItem);
          const option = document.createElement("option");
          option.value = student.indexNumber;
          option.textContent = `${student.firstName} ${student.otherNames} - Index: ${student.indexNumber}`;
          studentSelect.appendChild(option);
        });
      })
      .catch((error) => console.error("Error fetching students:", error));
  }

  // Handle grade update submission
  updateGradeForm.addEventListener("submit", function (event) {
    event.preventDefault();
    const selectedStudentIndex = studentSelect.value;
    const grade = gradeInput.value;

    fetch(`/api/admin/students/${selectedStudentIndex}/grades`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ grade }),
    })
      .then((response) => {
        if (response.ok) {
          alert("Grade updated successfully!");
          fetchStudents(); // Refresh the student list
        } else {
          alert("Failed to update grade.");
        }
      })
      .catch((error) => console.error("Error updating grade:", error));
  });

  // Initial fetch of students
  fetchStudents();
});
