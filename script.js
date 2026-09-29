const apps = [
    { name: "WhatsApp", category: "Social", icon: "💬", rating: 4.5, description: "Send messages, make calls and share photos and videos." },
    { name: "YouTube", category: "Music", icon: "▶️", rating: 4.7, description: "Watch videos, music, tutorials and entertainment." },
    { name: "Spotify", category: "Music", icon: "🎵", rating: 4.6, description: "Listen to millions of songs and podcasts." },
    { name: "Instagram", category: "Social", icon: "📸", rating: 4.4, description: "Share photos, videos and connect with friends." },
    { name: "Duolingo", category: "Education", icon: "🦉", rating: 4.8, description: "Learn new languages through fun interactive lessons." },
    { name: "Google Drive", category: "Tools", icon: "📁", rating: 4.5, description: "Store and access your files securely in the cloud." },
    { name: "Candy Crush", category: "Games", icon: "🍬", rating: 4.3, description: "Match candies and complete exciting puzzle levels." },
    { name: "Chess", category: "Games", icon: "♟️", rating: 4.6, description: "Play chess and improve your strategic thinking." }
];

const appContainer = document.getElementById("appContainer");
const searchInput = document.getElementById("searchInput");
const modal = document.getElementById("modal");
const closeBtn = document.getElementById("closeBtn");
const modalIcon = document.getElementById("modalIcon");
const modalName = document.getElementById("modalName");
const modalCategory = document.getElementById("modalCategory");
const modalDescription = document.getElementById("modalDescription");
const modalRating = document.getElementById("modalRating");

let currentCategory = "All";

function displayApps() {
    const searchText = searchInput.value.toLowerCase();

    const filteredApps = apps.filter(app => {
        const matchesCategory = currentCategory === "All" || app.category === currentCategory;
        const matchesSearch = app.name.toLowerCase().includes(searchText);
        return matchesCategory && matchesSearch;
    });

    appContainer.innerHTML = "";

    if (filteredApps.length === 0) {
        appContainer.innerHTML = "<h2>No apps found</h2>";
        return;
    }

    filteredApps.forEach(app => {
        const card = document.createElement("div");
        card.className = "app-card";

        card.innerHTML = `
            <div class="app-icon">${app.icon}</div>
            <h2>${app.name}</h2>
            <p class="category-name">${app.category}</p>
            <p class="rating">⭐ ${app.rating}</p>
            <button class="install-btn">View Details</button>
        `;

        card.querySelector(".install-btn").addEventListener("click", () => openModal(app));
        appContainer.appendChild(card);
    });
}

document.querySelectorAll(".category").forEach(button => {
    button.addEventListener("click", () => {
        document.querySelectorAll(".category").forEach(btn => btn.classList.remove("active"));
        button.classList.add("active");
        currentCategory = button.dataset.category;
        displayApps();
    });
});

searchInput.addEventListener("input", displayApps);

function openModal(app) {
    modalIcon.textContent = app.icon;
    modalName.textContent = app.name;
    modalCategory.textContent = "Category: " + app.category;
    modalDescription.textContent = app.description;
    modalRating.textContent = "⭐ Rating: " + app.rating;
    modal.style.display = "flex";
}

closeBtn.addEventListener("click", () => {
    modal.style.display = "none";
});

window.addEventListener("click", event => {
    if (event.target === modal) modal.style.display = "none";
});

document.getElementById("themeBtn").addEventListener("click", () => {
    document.body.classList.toggle("dark");
    const button = document.getElementById("themeBtn");
    button.textContent = document.body.classList.contains("dark") ? "☀️" : "🌙";
});

displayApps();
