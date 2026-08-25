const feed = document.getElementById( "feed");
const messagePool = [
  "Nachricht A", "Nachricht B", "Nachricht C"
];
let index = 0;
let lastMessage = null;
let observer;

function getRandomMessage() {
    if (messagePool.length === 0) return "";
    if (messagePool.length === 1) return messagePool[0];
    let newMessage;
    do {
        newMessage = messagePool[Math.floor(Math.random() * messagePool.length)];
    } while (newMessage === lastMessage);
    lastMessage = newMessage;
    return newMessage;
}

function addMessages(count = 5) {
    for (let i = 0; i < count; i++) {
        const message = document.createElement("div");
        message.className = "message";
        const randomMessage = getRandomMessage();
        message.textContent = randomMessage;
        feed.appendChild(message);
        lastMessage = randomMessage;
    }
    setupOberserver();
}

// Intersection Observer for endless scrolling
function setupOberserver() {
    if (observer) {
        observer.disconnect();
    }
    observer = new IntersectionObserver(entries => {
        if (entries[0].isIntersecting) {
            addMessages(5);
        }
    }, { threshold: 1.0 });
    if (feed.lastElementChild) {
        observer.observe(feed.lastElementChild);
    }
}

addMessages(10);