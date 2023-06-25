export function getUser() {
    return document.cookie.match(new RegExp('(^| )' + 'user' + '=([^;]+)'))[2];
}

export function setUser(name) {
    document.cookie = `user=${name};`;
}

//if (!cookie.includes('modal'))