import { setUser, getUser } from "./cookie.js";

const modal = document.querySelector('.modal')
const nameInput = document.querySelector('.modal__input');
const nameButton = document.querySelector('.modal__btn');

if (getUser() != null) {
    modal.classList.add('user-true-loaded');
}

nameButton.addEventListener('click', ()=> {
    const name = nameInput.value;

    if (name != '') {
        setUser(name);
    }

    modal.classList.add('user-true')
});