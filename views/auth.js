// auth.js
const logoutButton = document.getElementById("logout");
if (logoutButton) {
  logoutButton.addEventListener("click", function () {
    localStorage.removeItem("loggedInUser");
    alert("You have been logged out.");
    window.location.href = "home.html";
  });
}

// Register functionality
document
  .getElementById("registerForm")
  ?.addEventListener("submit", function (e) {
    e.preventDefault();
    const name = document.getElementById("registerName").value;
    const email = document.getElementById("registerEmail").value;
    const password = document.getElementById("registerPassword").value;

    // Retrieve existing users
    const existingUsers = JSON.parse(localStorage.getItem("users")) || [];
    const userExists = existingUsers.find((user) => user.email === email);

    if (userExists) {
      alert("User already exists. Please log in.");
      return;
    }

    const newUser = { name, email, password, avatar: "default-avatar.png" };
    existingUsers.push(newUser);
    localStorage.setItem("users", JSON.stringify(existingUsers));
    alert("Registration successful! You can now log in.");
    window.location.href = "login.html";
  });

// Login functionality
document.getElementById("loginForm")?.addEventListener("submit", function (e) {
  e.preventDefault();
  const email = document.getElementById("loginEmail").value;
  const password = document.getElementById("loginPassword").value;

  const users = JSON.parse(localStorage.getItem("users")) || [];
  const user = users.find(
    (user) => user.email === email && user.password === password
  );

  if (user) {
    localStorage.setItem("loggedInUser", JSON.stringify(user));
    alert("Login successful!");
    window.location.href = "home.html";
  } else {
    alert("Invalid credentials. Please try again.");
  }
});
