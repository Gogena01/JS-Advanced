import { deleteItem, getDetails, getOwn, getTotal, likeItem } from '../api/data.js';
import { html, until } from '../lib.js';
import { getUserData } from '../util.js';

const detailsTemplate = (item, onDelete, isOwner, isLogged, totalLikes, onLike, hasLike) => html`
<section id="details-page" class="details">
    <div class="book-information">
        <h3>${item.title}</h3>
        <p class="type">Type: ${item.type}</p>
        <p class="img"><img src=${item.imageUrl}></p>
        <div class="actions">
            <!--Edit/Delete buttons ( Only for creator of this book )-->
            ${isOwner ? html`<a class="button" href=${`/edit/${item._id}`}>Edit </a> <a @click=${onDelete}
                class="button">Delete</a>` : ''}

            <!-- Like button ( Only for logged-in users, which is not creators of the current book ) -->
            ${!isOwner && isLogged && hasLike ? html`<a @click=${onLike} class="button">Like</a>` : null}

            <!--( for Guests and Users )-->
            <div class="likes">
                <img class="hearts" src="/images/heart.png">
                <span id="total-likes">Likes: ${totalLikes}</span>
            </div>

        </div>
    </div>
    <div class="book-description">
        <h3>Description:</h3>
        <p>${item.description}</p>
    </div>`


export async function detailsPage(ctx) {
    const userData = getUserData();
    const item = await getDetails(ctx.params.id);
    let totalLikes = await getTotal(ctx.params.id);
    let myLikes;
    let hasLike;


    let isLogged;
    let isOwner;
    if (userData != null) {
        isOwner = userData.id == item._ownerId
        isLogged = userData != null;
        myLikes = await getOwn(ctx.params.id, userData.id);
        hasLike= myLikes == 0;
    }

    console.log(hasLike)
    ctx.render(detailsTemplate(item, onDelete, isOwner, isLogged, totalLikes, onLike, hasLike));

    async function onDelete() {
        await deleteItem(ctx.params.id);
        ctx.page.redirect('/')
    }

    async function onLike() {
        await likeItem(ctx.params.id);
        ctx.page.redirect(`/details/${ctx.params.id}`)
    }
}

