
const token = localStorage.getItem("token");
const user = JSON.parse(localStorage.getItem("user"));

if (!token || !user) {
    alert("Please login first!");
    window.location.href = "login.html";
} else {
    document.getElementById("studentName").textContent =
        "Name: " + user.name;

    document.getElementById("studentEmail").textContent =
        "Email: " + user.email;

    document.getElementById("studentRole").textContent =
        "Role: " + user.role;
}

document.getElementById("logoutBtn").addEventListener("click", function(event) {
    event.preventDefault();

    localStorage.removeItem("token");
    localStorage.removeItem("user");

    alert("Logged out successfully!");
    window.location.href = "login.html";
});
