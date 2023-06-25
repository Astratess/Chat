import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";
import { getUser } from "./userCheck.js";

const appSettings = {
    databaseURL: "https://chat-db5fc-default-rtdb.europe-west1.firebasedatabase.app/"
}

const app = initializeApp(appSettings)
const database = getDatabase(app)
const chatRoom = ref(database, "chatRoom")

const messageInput = document.getElementById("chat__message")
const addButton = document.getElementById("chat__btn")
const chatBody = document.getElementById("chat__wrapper")

addButton.addEventListener("click", function() {
    const messageValue = messageInput.value;
    const user = getUser();
    
    if (messageValue != '') {
        push(chatRoom, { user: user , message: messageValue });
    
        clearMessageField();
    }
})

onValue(chatRoom, function(snapshot) {
    if (snapshot.exists()) {
        const messages = Object.entries(snapshot.val())
    
        clearChatBody()
        
        for (const message of messages) {
            appendItemToShoppingListEl(message);
        }    
    } else {
        chatBody.innerHTML = "";
    }
})

function clearChatBody() {
    chatBody.innerHTML = "";
}

function clearMessageField() {
    messageInput.value = "";
}

function appendItemToShoppingListEl(item) {
    const userCheck = item[1].user;
    const message = item[1].message;
    
    const newEl = document.createElement("li")
    newEl.innerHTML = `<p>${message}</P>`
    
    if (userCheck == getUser()) {
        newEl.classList.add('current');
    } else {
        newEl.classList.add('not-current');
    }
    chatBody.append(newEl)
}

const nameButton = document.querySelector('.modal__btn');

nameButton.addEventListener('click', ()=> {
    appendItemToShoppingListEl();
});