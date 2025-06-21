document.addEventListener("DOMContentLoaded", function () {
  const registrationForm = document.getElementById("registration-form");
  const registrationResult = document.getElementById("registration-result");

  registrationForm.addEventListener("submit", async function (event) {
    event.preventDefault();

    const voucherCode = document.getElementById("voucher-code").value;
    const firstName = document.getElementById("first-name").value;
    const otherNames = document.getElementById("other-names").value;
    const departmentId = document.getElementById("department").value;

    try {
      const response = await fetch("http://localhost:3000/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          voucher_code: voucherCode,
          first_name: firstName,
          other_names: otherNames,
          department_id: departmentId,
        }),
      });

      const result = await response.json();

      if (
        response.status === 409 &&
        result.message === "Voucher has already been used."
      ) {
        alert(
          "This voucher has already been used. Please log in with your index number and password."
        );
        window.location.href = "/login.html";
        return;
      }

      if (result.student && result.student.index_number) {
        // Hide the registration form
        registrationForm.style.display = "none";
        // Hide the login link
        document.getElementById("login-link-container").style.display = "none";
        registrationResult.innerHTML = `
  <div class="registration-success-box">
    <h3>Registration Successful!</h3>
    <p><strong>Full Name:</strong> ${result.student.full_name}</p>
    <label for="index-number-box"><strong>Your Index Number:</strong></label>
    <div class="copy-row">
      <input id="index-number-box" type="text" value="${result.student.index_number}" readonly>
    </div>
    <button id="copy-index-btn">Copy</button>
    <p style="margin-top:0;">Use this index number and the default password <b>group16</b> to log in.</p>
    <a href="/login.html" class="login-link">Go to Login</a>
  </div>
`;
        // Add copy functionality
        const copyBtn = document.getElementById("copy-index-btn");
        copyBtn.addEventListener("click", function () {
          const input = document.getElementById("index-number-box");
          navigator.clipboard.writeText(input.value).then(() => {
            copyBtn.textContent = "Copied";
            setTimeout(() => {
              copyBtn.textContent = "Copy";
            }, 1500);
          });
        });
      } else if (
        result.success ||
        result.message === "Registration successful"
      ) {
        alert("Registration successful! Redirecting to your dashboard...");
        window.location.href = "/dashboard.html";
      } else {
        alert("Registration failed: " + (result.message || "Unknown error"));
      }
    } catch (error) {
      alert("Registration failed: Could not connect to server.");
      console.error(error);
    }
  });
});
