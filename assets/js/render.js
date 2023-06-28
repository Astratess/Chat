import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { getDatabase, ref, push, onValue } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";
import { getUser } from "./cookie.js";

let lastUser;
let initialized = false;

const appSettings = {
    databaseURL: "https://chat-db5fc-default-rtdb.europe-west1.firebasedatabase.app/"
}

const app = initializeApp(appSettings)
const database = getDatabase(app)
const chatRoom = ref(database, "chatRoom")

const messageInput = document.getElementById("chat__message")
const messageInputReal = document.getElementById("chat__message-real")
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
        const messages = Object.entries(snapshot.val());
        const lastMessage = messages[messages.length-1];

        clearChatBody()
        
        for (const message of messages) {
            appendItemToShoppingListEl(message);
        }

        if (initialized) {
            notify(lastMessage);
        } else {
            initialized = true;
        }
        
    } else {
        chatBody.innerHTML = "";
    }
})

function clearChatBody() {
    chatBody.innerHTML = "";
}

function clearMessageField() {
    messageInputReal.value = "";
    messageInput.value = "";
}

function appendItemToShoppingListEl(item) {
    const userCheck = item[1].user;
    let message = item[1].message;
    const currentUser = getUser();
    const messageHasLink = message.includes('http') || message.includes('https');
    
    if (messageHasLink) {
        message = handleLinks(message);
    }

    const newEl = document.createElement("li");
    newEl.innerHTML = `<p>${message}</p>`;

    if(userCheck != lastUser) {
        if (userCheck != currentUser) {
            newEl.dataset.user = `${userCheck}`;
        }

        lastUser = userCheck;
    }

    userCheck == currentUser ? newEl.classList.add('current') :  newEl.classList.add('not-current');

    chatBody.append(newEl);

    setTimeout(() => {
        newEl.scrollIntoView(false);
    }, 100)
}

/* Render when user added */

const nameButton = document.querySelector('.modal__btn');

nameButton.addEventListener('click', ()=> {
    appendItemToShoppingListEl();
});

/* --------- Handle links in messages --------- */

function handleLinks(item) {
    const messageWords = item.split(" ");
    const refactoredMessage = [];
    
    for (let word of messageWords) {
        word.includes('http') || word.includes('https') ? refactoredMessage.push(`<a href='${word}'>${word}</a>`) : refactoredMessage.push(word);
    }

    return refactoredMessage.join(' ');
}

/* ------- Notification ------- */

function notify(item) {
    Notification.requestPermission().then(perm => {
        if (perm == 'granted') {
            new Notification(`${item[1].user}`, {
                icon: "/assets/images/hexanect-logo.svg",
                body: `${item[1].message}`,
            });
        }
    });
}