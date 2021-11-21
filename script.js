const socket = io('https://alnakeeb-chat.herokuapp.com/', { transports: ['websocket'] })
const chat = document.getElementById("chat")
const messageInput = document.getElementById("message")
const chatContainer = document.getElementById("chatContainer")
const writing = document.querySelector(".writing")
const username = document.getElementById("username")
const save = document.getElementById("save")



save.addEventListener("click", () => {
  const name = username.value
  joinMessage("you joined the chat ")
  socket.emit("new-user", name)
})

//user join and leave handel

socket.on('user-connected', name => {
  joinMessage(`${name} connected`)
})

socket.on('user-disconnected', name => {
  leaveMessage(`${name} disconnected`)
})

//send messages handeling

chat.addEventListener("submit", e => {
  e.preventDefault()

  const message = messageInput.value
  socket.emit("send-chat-message", message)
  console.log(message)
  sendMessage(`You: ${message} `)
  messageInput.value = ''

})

//receive messages throught socket handeling

socket.on('chat-message', data => {

  if (data.name) {
    const name = data.name
    receiveMessage(`${name}:${data.message}`)
  } else {
    const name = "No-Name"
    receiveMessage(`${name}:${data.message}`)
  }
})


/* helper funcations */


//helper funcation when user join the chat Message & append it on chat

function joinMessage(message) {
  const messageElement = document.createElement("div")
  messageElement.setAttribute("class", "join");
  messageElement.innerText = message
  chatContainer.append(messageElement)
}

//helper funcation when user leave the chat Message & append it on chat

function leaveMessage(message) {
  const messageElement = document.createElement("div")
  messageElement.setAttribute("class", "leave");
  messageElement.innerText = message
  chatContainer.append(messageElement)
}


//helper funcation send Message & append it on chat


function sendMessage(message) {
  const messageElement = document.createElement("div")
  messageElement.setAttribute("class", "sent");
  messageElement.innerText = message
  chatContainer.append(messageElement)
  setTimeout(() => {
    const messages = document.querySelectorAll("#chatContainer div")
    console.log(messages[messages.length - 1])
    const lastMessage = messages[messages.length - 1]
    const viewNew = lastMessage.offsetTop
    chatContainer.scroll({
      top: viewNew
    })
  }, 1000)

}


//helper funcation receive Message & append it on chat


function receiveMessage(message) {
  const messageElement = document.createElement("div")
  messageElement.setAttribute("class", "received");
  messageElement.innerText = message
  chatContainer.append(messageElement)
  setTimeout(() => {
    const messages = document.querySelectorAll("#chatContainer div")
    console.log(messages[messages.length - 1])
    const lastMessage = messages[messages.length - 1]
    const viewNew = lastMessage.offsetTop
    chatContainer.scroll({
      top: viewNew
    })
  }, 1000)

}

