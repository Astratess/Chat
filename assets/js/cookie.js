export function getUser() {
    const cookie = document.cookie.match(new RegExp('(^| )' + 'user' + '=([^;]+)'));
    
    if (cookie != undefined) {
        return cookie[2];
    } else if (localStorage.getItem('user') != undefined) {
        return localStorage.getItem('user');
    }
}

export function setUser(name) {
    const d = new Date();
	d.setTime(d.getTime() + (30*24*60*60*1000));

	const expires = "expires=" + d.toUTCString();

    document.cookie = `user=${name}; ${expires};path=/`;
}
