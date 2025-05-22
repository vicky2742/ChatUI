// script.js

const sendButton = document.getElementById("send-button");
const messageInput = document.getElementById("message-input");
const messagesContainer = document.getElementById("messages");
const themeToggle = document.getElementById("theme-toggle");

// Load messages from localStorage
window.addEventListener("load", () => {
  const savedMessages = JSON.parse(localStorage.getItem("chatMessages")) || [];
  savedMessages.forEach((msg) =>
    appendMessage(msg.text, msg.type, msg.timestamp)
  );
});

function appendMessage(text, type, timestamp) {
  const message = document.createElement("div");
  message.classList.add("message", type);
  message.innerHTML = `
    <div>${text}</div>
    <div class="timestamp">${timestamp}</div>
  `;
  messagesContainer.appendChild(message);
  messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

function getCurrentTime() {
  const now = new Date();
  return now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

sendButton.addEventListener("click", () => {
  const text = messageInput.value.trim();
  if (!text) return;
  const time = getCurrentTime();
  appendMessage(text, "sent", time);
  saveMessage(text, "sent", time);
  messageInput.value = "";

  // Simulate reply
  setTimeout(() => {
    appendMessage("Got it!", "received", getCurrentTime());
    saveMessage("Got it!", "received", getCurrentTime());
  }, 1000);
});

function saveMessage(text, type, timestamp) {
  const existing = JSON.parse(localStorage.getItem("chatMessages")) || [];
  existing.push({ text, type, timestamp });
  localStorage.setItem("chatMessages", JSON.stringify(existing));
}

// Theme toggle
themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark");
  localStorage.setItem(
    "theme",
    document.body.classList.contains("dark") ? "dark" : "light"
  );
});

// Load theme from localStorage
window.addEventListener("DOMContentLoaded", () => {
  const theme = localStorage.getItem("theme");
  if (theme === "dark") document.body.classList.add("dark");
});
