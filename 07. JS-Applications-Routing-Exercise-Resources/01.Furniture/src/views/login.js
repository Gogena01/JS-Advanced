import { html, render } from "./node_modules/lit-html/lit-html.js";

export function loginPage() {
    console.log('login view')
}

/*const form = document.querySelector('form');
form.addEventListener('submit', onLogin);


async function onLogin(event) {
    event.preventDefault();
    const formData = new FormData(form);
    const email = formData.get('email').trim();
    const password = formData.get('password').trim();

    const res = await fetch('http://localhost:3030/users/login', {
        method: 'post',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password })
    });

    const data = await res.json();
    sessionStorage.setItem('userData', JSON.stringify({
        email: data.email,
        id: data._id,
        token: data.accessToken
    }));

    form.reset();
    
 
    window.location = 'catalog.html'
}*/

