import { searchItem } from '../api/data.js';
import { html, until } from '../lib.js';

const searchTemplate = (dataPromise) => html`
<section id="searchPage">
    <h1>Search by Name</h1>

    <div class="search">
        <input id="search-input" type="text" name="search" placeholder="Enter desired album's name" .value="In">
        <button class="button-list">Search</button>
    </div>

    <h2>Results:</h2>
    <div class="search-result">
        ${until(dataPromise(), html`<p>Loading...</p>`)}
    </div>
</section>
`;


const itemTemplate = (item) => html`
<div class="card-box">
    <img src=${item.imgUrl}>
    <div>
        <div class="text-center">
            <p class="name">Name: ${item.name}</p>
            <p class="artist">Artist: ${item.artist}</p>
            <p class="genre">Genre: ${item.genre}</p>
            <p class="price">Price: $${item.price}</p>
            <p class="date">Release Date:${item.releaseDate}</p>
        </div>
        <div class="btn-group">
            <a href="/details/${item._id}" id="details">Details</a>
        </div>
    </div>
</div>`;



export async function searchPage(ctx) {
    let query;
    let items = [];

    async function onLoad() {
        query = document.getElementById('search-input').value;
        if (query) {
            items = await searchItem(query);
            ctx.render(searchTemplate(result));
        }
    }

    function result() {
        if (items.length > 0) {
            return items.map((item) => itemTemplate(item));
        } else {
            return html`<p class="no-result">No result.</p>`;
        }
    }

    ctx.render(searchTemplate(result));
    document.querySelector('button.button-list').addEventListener('click', onLoad);
}
