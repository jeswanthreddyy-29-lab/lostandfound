
const registerForm = document.getElementById("registerForm");

registerForm.addEventListener("submit", async function(event) {
    event.preventDefault();

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    const message = document.getElementById("message");

    try {
        const response = await fetch("/api/auth/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name,
                email,
                password
            })
        });

        const result = await response.json();

        if (!response.ok) {
            throw new Error(result.message || "Registration failed");
        }

        message.textContent = "Registration successful!";
        message.style.color = "green";

        alert("Account created successfully!");

        registerForm.reset();

        window.location.href = "login.html";

    } catch (error) {
        message.textContent = error.message;
        message.style.color = "red";
    }
});
