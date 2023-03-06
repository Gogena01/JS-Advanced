import { getCatalog } from '../api/data.js';
import { html,until } from '../lib.js';

const homeTemplate = (dataPromise, isMatch) => html`
<section id="dashboard-page" class="dashboard">
    <h1>Dashboard</h1>
    <ul class="other-books-list">
        ${isMatch ? until(dataPromise,html`<p>Loading &hellip;</p>`) : html`<p class="no-books">No books in database!</p>`}
    </ul>

    <!--<p class="no-books">No books in database!</p>-->
</section>`

const catalogItem = (item) => html`
<li class="otherBooks">
    <h3>${item.title}</h3>
    <p>Type: ${item.type}</p>
    <p class="img"><img src=${item.imageUrl}></p>
    <a class="button" href=${`/details/${item._id}`}>Details</a>
</li>`

export async function homePage(ctx) {
    const items = await getCatalog();
    const isMatch = items.length != 0;
    ctx.render(homeTemplate(catalog(), isMatch))
}

async function catalog() {
    const items = await getCatalog();

    return Object.values(items).map(c => catalogItem(c))
}