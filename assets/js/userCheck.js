export function getUser() {
    return localStorage.getItem("user");
}

export function setUser(name) {
    localStorage.setItem("user", name);
}