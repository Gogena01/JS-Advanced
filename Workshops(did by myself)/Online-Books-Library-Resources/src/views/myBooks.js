import { getCatalog, getMyProfile } from '../api/data.js';
import { html, until } from '../lib.js';
import { getUserData } from '../util.js';

const myBooksTemplate = (dataPromise, isMatch) => html`
<section id="my-books-page" class="my-books">
    <h1>My Books</h1>
    <ul class="my-books-list">
        ${isMatch ? until(dataPromise, html`<p>Loading &hellip;</p>`) : html`<p class="no-books">No books in database!</p>`}
    </ul>
</section>`

const catalogItem = (item) => html`
<li class="otherBooks">
    <h3>${item.title}</h3>
    <p>Type: ${item.type}</p>
    <p class="img"><img src=${item.imageUrl}></p>
    <a class="button" href=${`/details/${item._id}`}>Details</a>
</li>`

export async function myBooksPage(ctx) {

    const userData = getUserData();
    const items = await getMyProfile(userData.id);
    const isMatch = items.length != 0
    ctx.render(myBooksTemplate(getMyItems(),isMatch));

      
}

async function getMyItems() {
    const userData = getUserData();
    const items = await getMyProfile(userData.id);
    

    return items.map(i => catalogItem(i))
}



