import { login, register } from '../api/data.js';
import { html } from '../lib.js';


const registerTemplate = (onSubmit) => html`
<form id="register-form" @submit=${onSubmit}>
    <div class="container">
        <h1>Register</h1>
        <label for="username">Username</label>
        <input id="username" type="text" placeholder="Enter Username" name="username">
        <label for="email">Email</label>
        <input id="email" type="text" placeholder="Enter Email" name="email">
        <label for="password">Password</label>
        <input id="password" type="password" placeholder="Enter Password" name="password">
        <label for="repeatPass">Repeat Password</label>
        <input id="repeatPass" type="password" placeholder="Repeat Password" name="repeatPass">
        <div class="gender">
            <input type="radio" name="gender" id="female" value="female">
            <label for="female">Female</label>
            <input type="radio" name="gender" id="male" value="male">
            <label for="male">Male</label>
        </div>
        <input type="submit" class="registerbtn button" value="Register">
        <div class="container signin">
            <p>Already have an account?<a href="/login">Sign in</a>.</p>
        </div>
    </div>
</form>`

export function registerPage(ctx) {
    var gender;
    ctx.render(registerTemplate(onSubmit));
    async function onSubmit(event) {
        event.preventDefault();
        const formData = new FormData(event.target);

        const username = formData.get('username').trim();
        const email = formData.get('email').trim();
        const password = formData.get('password').trim();
        const rePass = formData.get('repeatPass').trim();



        try {
            if (email == '' || password == '' || username == '') {
                throw {
                    error: new Error('All fields are required!'),
                    errors: {
                        username: username == '',
                        email: email == '',
                        password: password == '',
                        rePass: rePass == '',
                    }
                };
            }

            if (password != rePass) {
                throw {
                    error: new Error('Passwords don\'t match!'),
                    errors: {
                        password: true,
                        rePass: true
                    }
                };
            }

            if (document.querySelector('#female').checked) {
                gender = 'female';
            }

            if (document.querySelector('#male').checked) {
                gender = 'male'
            }


            await register(username, email, password, gender);
            ctx.updateUserNav();
            event.target.reset();
            ctx.page.redirect('/')
        } catch (err) {
            document.getElementById('errorBox').style.display = 'block'
            document.getElementById('notifications').querySelector('span').textContent = err.message
        }
    }

}