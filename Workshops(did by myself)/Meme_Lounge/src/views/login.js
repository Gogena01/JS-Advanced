import { login } from '../api/data.js';
import { html } from '../lib.js';


const loginTemplate = (onSubmit) => html`
<form @submit=${onSubmit} id="login-form">
    <div class="container">
        <h1>Login</h1>
        <label for="email">Email</label>
        <input id="email" placeholder="Enter Email" name="email" type="text">
        <label for="password">Password</label>
        <input id="password" type="password" placeholder="Enter Password" name="password">
        <input type="submit" class="registerbtn button"  value="Login">
        <div class="container signin">
            <p>Dont have an account?<a href="/register">Sign up</a>.</p>
        </div>
    </div>
</form>`

export function loginPage(ctx) {

    ctx.render(loginTemplate(onSubmit));

    async function onSubmit(event) {
        event.preventDefault();
        const formData = new FormData(event.target);

        const email = formData.get('email').trim();
        const password = formData.get('password').trim();

        try {
            if(email == '' || password == '') {
                throw new Error('Email or password don\'t match')
            }
            await login(email, password);
            ctx.updateUserNav();
            event.target.reset();
            ctx.page.redirect('/');
        } catch (err) {
            document.getElementById('errorBox').style.display = 'block'
            document.getElementById('notifications').querySelector('span').textContent = err.message
        }
    }


}