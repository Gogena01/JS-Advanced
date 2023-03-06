import { deleteItem, getById } from '../api/data.js'
import { html } from '../lib.js';
import { getUserData } from '../util.js';

const detailsTemplate = (item, isMatch, isLogged, onDelete) => html`
<section id="detailsPage">
    <div class="wrapper">
        <div class="albumCover">
            <img src=${item.imgUrl}>
        </div>
        <div class="albumInfo">
            <div class="albumText">

                <h1>Name: ${item.name}</h1>
                <h3>Artist: ${item.artist}</h3>
                <h4>Genre: ${item.genre}</h4>
                <h4>Price: ${`$${item.price}`}</h4>
                <h4>Date: ${item.releaseDate}</h4>
                <p>Description: ${item.description}</p>
            </div>

            ${isMatch && isLogged ? html`<div class="actionBtn">
                <a href=${`/edit/${item._id}`} class="edit">Edit</a>
                <a @click=${onDelete} href="#" class="remove">Delete</a>
            </div>` : null}
        </div>
    </div>
</section>`

export async function detailsPage(ctx) {
    const item = await getById(ctx.params.id);
    const userData = getUserData();
    let isMatch;
    const isLogged = userData != null;
    if (userData != null) {
        isMatch = userData.id == item._ownerId
    }


    ctx.render(detailsTemplate(item, isMatch, isLogged, onDelete))


    async function onDelete() {
        await deleteItem(ctx.params.id);
        ctx.page.redirect('/catalog')
    }
}