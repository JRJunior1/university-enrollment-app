document.addEventListener("DOMContentLoaded", function () {
  const studentData = localStorage.getItem("student");
  if (!studentData) {
    window.location.href = "login.html";
    return;
  }
  const student = JSON.parse(studentData);
  const indexNumber = student.index_number;

  fetch(`http://localhost:3000/api/dashboard/${indexNumber}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Dashboard info not found");
      }
      return response.json();
    })
    .then((data) => {
      displayDashboard(data);
    })
    .catch((error) => {
      console.error("There was a problem fetching dashboard info:", error);
      alert("Could not load dashboard info. Please contact admin.");
    });

  const logoutBtn = document.getElementById("logout-btn");
  if (logoutBtn) {
    logoutBtn.addEventListener("click", function () {
      localStorage.removeItem("student");
      window.location.href = "login.html";
    });
  }
});

function displayDashboard(data) {
  document.getElementById("student-info").innerHTML = `
    <h2>Student Information</h2>
    <p><strong>Index Number:</strong> ${data.index_number}</p>
    <p><strong>Name:</strong> ${data.full_name}</p>
    <p><strong>Department:</strong> ${data.department}</p>
  `;

  let gradesHtml =
    "<h3>Your Courses & Grades</h3><table><tr><th>Course</th><th>Grade</th></tr>";
  data.courses.forEach((cg) => {
    gradesHtml += `<tr><td>${cg.courseName}</td><td>${cg.grade}</td></tr>`;
  });
  gradesHtml += "</table>";
  document.getElementById("grades").innerHTML = gradesHtml;
}
