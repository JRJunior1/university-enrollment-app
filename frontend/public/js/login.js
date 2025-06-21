document.addEventListener("DOMContentLoaded", function () {
  const loginForm = document.getElementById("login-form");

  loginForm.addEventListener("submit", async function (event) {
    event.preventDefault();

    const indexNumber = document.getElementById("index-number").value;
    const password = document.getElementById("password").value;

    try {
      const response = await fetch("http://localhost:3000/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          index_number: indexNumber,
          password: password,
        }),
      });

      const result = await response.json();

      if (result.success) {
        // Store student info in localStorage
        localStorage.setItem("student", JSON.stringify(result.student));
        alert("Login successful! Redirecting to dashboard...");
        window.location.href = "/dashboard.html";
      } else {
        alert("Login failed: " + (result.message || "Invalid credentials"));
      }
    } catch (error) {
      alert("Login failed: Could not connect to server.");
      console.error(error);
    }
  });
});
