const socket = io('https://alnakeeb-chat.herokuapp.com/', { transports: ['websocket'] })
const chat = document.getElementById("chat")
const messageInput = document.getElementById("message")
const chatContainer = document.getElementById("chatContainer")

const name = prompt("Enter Your Name")
joinMessage("you joined the chat ")
socket.emit("new-user" , name)


socket.on('chat-message', data => {
  receiveMessage(`${data.name}: ${data.message}`)
})  

socket.on('user-connected', name => {
  joinMessage(`${name} connected`)
})

socket.on('user-disconnected', name => {
  leaveMessage(`${name} disconnected`)
})


chat.addEventListener("submit", e=>{
e.preventDefault()
  const message = messageInput.value
  socket.emit("send-chat-message" , message)
  sendMessage(`You: ${message}`)
  messageInput.value = ''
})


function joinMessage(message) {
  const messageElement = document.createElement("div")
  messageElement.setAttribute("class", "join");
  messageElement.innerText=message
  chatContainer.append(messageElement)
}
function leaveMessage(message) {
  const messageElement = document.createElement("div")
  messageElement.setAttribute("class", "leave");
  messageElement.innerText=message
  chatContainer.append(messageElement)
}
function sendMessage(message) {
  const messageElement = document.createElement("div")
  messageElement.setAttribute("class", "sent");
  messageElement.innerText=message
  chatContainer.append(messageElement)
}
function receiveMessage(message) {
  const messageElement = document.createElement("div")
  messageElement.setAttribute("class", "received");
  messageElement.innerText=message
  chatContainer.append(messageElement)
}

