const chatBox = document.getElementById("chat-box");
const userInput = document.getElementById("user-input");
const sendBtn = document.getElementById("send-btn");

// Change this to your deployed backend URL
const BACKEND_URL = "http://localhost:5000/chat";

async function sendMessage() {
  const message = userInput.value.trim();
  if (!message) return;

  addMessage("You", message, "user");
  userInput.value = "";

  try {
    const res = await fetch(BACKEND_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message })
    });

    const data = await res.json();
    const reply = data?.choices?.[0]?.message?.content || "⚠️ No response!";
    addMessage("Kahana", reply, "ai");
  } catch (err) {
    console.error(err);
    addMessage("Kahana", "⚠️ Server error! Check backend.", "ai");
  }
}

function addMessage(sender, text, type) {
  const div = document.createElement("div");
  div.classList.add("message", type);
  div.textContent = text;
  chatBox.appendChild(div);
  chatBox.scrollTop = chatBox.scrollHeight;
}

sendBtn.addEventListener("click", sendMessage);
userInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter" && !e.shiftKey) {
    e.preventDefault();
    sendMessage();
  }
});
