import { getMyItems } from '../api/data.js';
import { html, until } from '../lib.js';
import { getUserData } from '../util.js';


const myProfileTemplate = (dataPromise, user, memes) => html`
<section id="user-profile-page" class="user-profile">
    <article class="user-info">
        <img id="user-avatar-url" alt="user-profile" src=${`./images/${user.gender}.png`}> <div class="user-content">
        <p>Username: ${user.username}</p>
        <p>Email: ${user.email}</p>
        <p>My memes count: ${memes.length}</p>
        </div>
    </article>
    <h1 id="user-listings-title">User Memes</h1>
    <div class="user-meme-listings">
        ${memes.length != 0 ? until(dataPromise, html`<p>Loading &hellip;</p>`) : html`<p class="no-memes">No memes in database.</p>`}
    </div>
</section>`


const myMemes = (item) => html`
    <div class="user-meme">
        <p class="user-meme-title">${item.title}</p>
        <img class="userProfileImage" alt="meme-img" src=${item.imageUrl}>
        <a class="button" href=${`/details/${item._id}`}>Details </a> 
    </div>`


export async function myProfile(ctx) {
    const userData = getUserData();

    const memes = await getMyItems(userData.id)

    if (userData != null) {
        ctx.render(myProfileTemplate(myMeme(), userData, memes))
    } else {
        ctx.page.redirect('/login')
    }

}

async function myMeme() {
    const userData = getUserData();
    const memes = await getMyItems(userData.id);

    return memes.map(m => myMemes(m))
}