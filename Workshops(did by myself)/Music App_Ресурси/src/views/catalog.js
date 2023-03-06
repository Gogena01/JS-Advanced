import { getAllItems } from '../api/data.js';
import { html, until } from '../lib.js';

const catalogTemplate = (dataPromise) => html`
<section id="catalogPage">
    <h1>All Albums</h1>

    ${until(dataPromise, html`<p>Loading &hellip;</p>`)}

</section>`

const catalogItem = (item) => html`
${ item != null ? html`<div class="card-box">
    <img src=${item.imgUrl}>
    <div>
        <div class="text-center">
            <p class="name">Name: ${item.name}</p>
            <p class="artist">Artist: ${item.artist}</p>
            <p class="genre">Genre: ${item.genre}</p>
            <p class="price">Price: ${`$${item.price}`}</p>
            <p class="date">Release Date: ${item.releaseDate}</p>
        </div>
        <div class="btn-group">
            <a href=${`/details/${item._id}`} id="details">Details</a>
        </div>
    </div>
</div>` : html`<p>No Albums in Catalog!</p>`}
`


export function catalogPage(ctx) {
    ctx.render(catalogTemplate(catalog()))
}

async function catalog() {
    const items = await getAllItems();

    const result = items.map(i => catalogItem(i));

    return result
}