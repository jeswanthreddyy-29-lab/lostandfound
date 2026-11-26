
async function loadItems() {
    const container = document.querySelector(".items-container");

    try {
        const response = await fetch("/api/items");
        const items = await response.json();

        if (!response.ok) {
            throw new Error("Unable to load items");
        }

        displayItems(items);

    } catch (error) {
        container.innerHTML = "<p>Unable to load items.</p>";
        console.error(error);
    }
}

function displayItems(items) {
    const container = document.querySelector(".items-container");

    container.innerHTML = "";

    if (items.length === 0) {
        container.innerHTML = "<p>No items found!</p>";
        return;
    }

    items.forEach(function(item) {
        const card = document.createElement("div");
        card.className = "item-card";

        card.innerHTML = `
            <div class="item-image">📦</div>
            <h3></h3>
            <p class="category"></p>
            <p class="location"></p>
            <span class="${item.type === "Lost" ? "lost-label" : "found-label"}">
                ${item.type}
            </span>
            <button class="view-btn">View Details</button>
        `;

        card.querySelector("h3").textContent = item.name;
        card.querySelector(".category").textContent = "Category: " + item.category;
        card.querySelector(".location").textContent = "Location: " + item.location;

        card.querySelector(".view-btn").addEventListener("click", function() {
            viewItem(item._id);
        });

        container.appendChild(card);
    });
}

async function viewItem(id) {
    try {
        const response = await fetch(`/api/items/${id}`);
        const item = await response.json();

        if (!response.ok) {
            throw new Error(item.message || "Item not found");
        }

        alert(
            "Item Name: " + item.name +
            "\nType: " + item.type +
            "\nCategory: " + item.category +
            "\nDescription: " + item.description +
            "\nLocation: " + item.location +
            "\nDate: " + new Date(item.date).toLocaleDateString() +
            "\nStatus: " + item.status
        );

    } catch (error) {
        alert(error.message);
    }
}

async function searchItems() {
    const searchValue = document.querySelector(".search-box input")
        .value.toLowerCase();

    try {
        const response = await fetch("/api/items");
        const items = await response.json();

        const filteredItems = items.filter(function(item) {
            return item.name.toLowerCase().includes(searchValue) ||
                item.category.toLowerCase().includes(searchValue) ||
                item.location.toLowerCase().includes(searchValue);
        });

        displayItems(filteredItems);

    } catch (error) {
        console.error("Search error:", error);
    }
}

document.querySelector(".search-box button")
    .addEventListener("click", searchItems);

document.querySelector(".search-box input")
    .addEventListener("keydown", function(event) {
        if (event.key === "Enter") {
            searchItems();
        }
    });

loadItems();

// Update navigation based on login status
function updateNavigation() {
    const navLinks = document.querySelector(".nav-links");

    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user") || "null");

    if (token && user) {
        navLinks.innerHTML = "";

        const homeLink = document.createElement("a");
        homeLink.href = "index.html";
        homeLink.textContent = "Home";

        const itemsLink = document.createElement("a");
        itemsLink.href = "#items";
        itemsLink.textContent = "Lost & Found Items";

        const reportLink = document.createElement("a");
        reportLink.href = "report.html";
        reportLink.textContent = "Report Item";

        const welcome = document.createElement("span");
        welcome.textContent = "Hi, " + user.name;

        const logoutLink = document.createElement("a");
        logoutLink.href = "#";
        logoutLink.textContent = "Logout";

        logoutLink.addEventListener("click", function(event) {
            event.preventDefault();

            localStorage.removeItem("token");
            localStorage.removeItem("user");

            alert("Logged out successfully!");

            window.location.reload();
        });

        navLinks.append(
            homeLink,
            itemsLink,
            reportLink,
            welcome,
            logoutLink
        );
    }
}

updateNavigation();
