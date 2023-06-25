export function getUser() {
    const cookie = document.cookie.match(new RegExp('(^| )' + 'user' + '=([^;]+)'));
    
    if (cookie != undefined) {
        return cookie[2];
    }
}

export function setUser(name) {
    document.cookie = `user=${name};`;
}

//if (!cookie.includes('modal'))