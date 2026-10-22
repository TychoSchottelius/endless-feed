const feed = document.getElementById("feed");
let observer;

// history of recent texts. recentSet only contains unique texts, which accelerates lookups.
// but recentTexts is still needed to find oldest text in history.
const textHistorySize = 10;
const effectiveTextHistorySize = Math.min(textHistorySize, messageTexts.length - 1);
const recentTexts = [];
const recentSet = new Set();

function pickText(){
    if (messageTexts.length === 0) return "no messages available.";
    let text;
    do {
        text = messageTexts[Math.floor(Math.random() * messageTexts.length)];
    } while (recentSet.has(text));
    recentTexts.push(text);
    recentSet.add(text);
    if (recentTexts.length > effectiveTextHistorySize) {
        const oldestText = recentTexts.shift();
        recentSet.delete(oldestText);
    }
    return text;
}

function generateRandomCard() {
    const text = pickText();

    const font = fonts[Math.floor(Math.random() * fonts.length)];
    const fontSize = fontSizes[Math.floor(Math.random() * fontSizes.length)];
    const backgroundColor = backgroundColors[Math.floor(Math.random() * backgroundColors.length)];

    const card = document.createElement("div");
    card.className = "card";
    card.textContent = text;
    card.style.fontFamily = font;
    card.style.fontSize = fontSize;
    card.style.padding = `calc(${parseInt(fontSize)}px * 0,75)`;
    card.style.backgroundColor = backgroundColor;
    card.style.color = '#000000';

    return card;
}

function addCard(count = 5) {
    for (let i = 0; i < count; i++) {
        feed.appendChild(generateRandomCard());
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
            addCard(5);
        }
    }, {threshold: 1.0});
    if (feed.lastElementChild) {
        observer.observe(feed.lastElementChild);
    }
}

window.addEventListener("DOMContentLoaded", () => {
    addCard(10);
    setupObserver();
});