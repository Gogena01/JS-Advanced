import { getAllMemes } from '../api/data.js';
import { getMyItems } from '../api/data.js';
import { html, until } from '../lib.js';
import { getUserData } from '../util.js';


const allMemes = (dataPromise) => html`
<h1>All Memes</h1>
<div id="memes">
    ${until(dataPromise, html`<p>Loading &hellip;</p>`)}
    
</div>`

const meme = (item) => html`
${item != null 
    ? html`<div class="meme">
    <div class="card">
        <div class="info">
            <p class="meme-title">${item.title}</p>
            <img class="meme-image" alt="meme-img" src=${item.imageUrl}>
        </div>
        <div id="data-buttons">
            <a class="button" href=${`/details/${item._id}`}>Details</a>
        </div>
    </div>
</div>` 
: html`<p class="no-memes">No memes in database.</p>`}
`

export async function allMemesPage(ctx) {
    
    ctx.render(allMemes(loadItems()));
    

    
}

async function loadItems() {
    const memeItem = await getAllMemes()

    return memeItem.map(m => meme(m))
}