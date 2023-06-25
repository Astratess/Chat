export function getUser() {
    const cookie = document.cookie.match(new RegExp('(^| )' + 'user' + '=([^;]+)'))[2];
    
    if (cookie != undefined) {
        return cookie;
    }
}

export function setUser(name) {
    document.cookie = `user=${name};`;
}

//if (!cookie.includes('modal'))