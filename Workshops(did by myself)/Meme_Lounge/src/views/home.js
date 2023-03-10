import { getMyItems } from '../api/data.js';
import { html } from '../lib.js';
import { getUserData } from '../util.js';


const homeGuestTemplate = () => html`
<div id="welcome-container">
    <h1>Welcome To Meme Lounge</h1>
    <img src="/images/welcome-meme.jpg" alt="meme">
    <h2>Login to see our memes right away!</h2>
    <div id="button-div">
        <a href="/login" class="button">Login</a>
        <a href="/register" class="button">Register</a>
    </div>
</div>`

export function homeGuest(ctx) {
    const userData = getUserData();
    

    if (userData != null) {
        ctx.page.redirect('/allMemes')
    } else {
        ctx.render(homeGuestTemplate())
    }

    
}