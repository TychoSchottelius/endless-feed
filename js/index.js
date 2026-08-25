const feed = document.getElementById("feed");
let lastMessage = null;
let observer;

function generateRandomMessage() {
    if (messageTemplates.templates.length === 0) return "no messages available.";

    let newMessage;
    do {
        newMessage = messageTemplates.templates[Math.floor(Math.random() * messageTemplates.templates.length)];
    } while (newMessage === lastMessage && messageTemplates.templates.length > 1);

    lastMessage = newMessage;
    return newMessage;
}

function addMessages(count = 5) {
    for (let i = 0; i < count; i++) {
        const message = document.createElement("div");
        message.className = "message";
        message.textContent = generateRandomMessage();
        feed.appendChild(message);
    }
    setupObserver();
}

// Intersection Observer for endless scrolling
function setupObserver() {
    if (observer) {
        observer.disconnect();
    }
    observer = new IntersectionObserver(entries => {
        if (entries[0].isIntersecting) {
            addMessages(5);
        }
    }, {threshold: 1.0});
    if (feed.lastElementChild) {
        observer.observe(feed.lastElementChild);
    }
}

window.addEventListener("DOMContentLoaded", () => {
    addMessages(10);
    setupObserver();
});