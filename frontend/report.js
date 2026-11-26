
const reportForm = document.getElementById("reportForm");

reportForm.addEventListener("submit", async function(event) {
    event.preventDefault();

    const token = localStorage.getItem("token");

    // Check login status
    if (!token) {
        alert("Please login before reporting an item.");
        window.location.href = "login.html";
        return;
    }

    const newItem = {
        type: document.getElementById("itemType").value,
        name: document.getElementById("itemName").value,
        category: document.getElementById("category").value,
        description: document.getElementById("description").value,
        location: document.getElementById("location").value,
        date: document.getElementById("date").value,
        image: ""
    };

    try {
        const response = await fetch("/api/items", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + token
            },
            body: JSON.stringify(newItem)
        });

        const result = await response.json();

        if (!response.ok) {
            throw new Error(result.message || "Report submission failed");
        }

        alert("Your report has been submitted successfully!");

        reportForm.reset();

    } catch (error) {
        alert(error.message);
        console.error(error);
    }
});
