const socket = io('http://127.0.0.1:3000/', { transports: ['websocket'] })
const chat = document.getElementById("chat")
const messageInput = document.getElementById("message")
const chatContainer = document.getElementById("chatContainer")
const writing = document.querySelector(".writing")
const username = document.getElementById("username")
const save = document.getElementById("save")


save.addEventListener("click" , ()=>{
  if (username.value){

    const name = username.value
    joinMessage("you joined the chat ")
    socket.emit("new-user", name)
  }
  const name = "No-Name"
  joinMessage("you joined the chat ")
  socket.emit("new-user", name)

})






chat.addEventListener("submit", e=>{
e.preventDefault()
  
  const message = messageInput.value
  socket.emit("send-chat-message" , message)
  sendMessage(`You: ${message} `)
  messageInput.value = ''
})



socket.on('chat-message', data => {
  receiveMessage(` ${data.message}:${data.name}`)
})

socket.on('user-connected', name => {
  joinMessage(`${name} connected`)
})

socket.on('user-disconnected', name => {
  leaveMessage(`${name} disconnected`)
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

