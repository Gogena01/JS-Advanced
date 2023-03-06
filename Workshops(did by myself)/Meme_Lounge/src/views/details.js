import { deleteItem, getById } from '../api/data.js';
import { html } from '../lib.js';
import { getUserData } from '../util.js';


const detailsTemplate = (meme, isShown, onDelete) => html`
<section id="meme-details">
    <h1>Meme Title: ${meme.title}

    </h1>
    <div class="meme-details">
        <div class="meme-img">
            <img alt="meme-alt" src=${meme.imageUrl}>
        </div>
        <div class="meme-description">
            <h2>Meme Description</h2>
            <p>
                ${meme.description}
            </p>

            ${isShown 
            ? html`<a class="button warning" href=${`/edit/${meme._id}`}>Edit</a>
                <button @click=${onDelete} class="button danger">Delete</button>`
                : ''}
                
            
        </div>
    </div>
</section>`

export async function detailsPage(ctx) {
    var isShown;
    const meme = await getById(ctx.params.id);
    const userData = getUserData();
    if(userData != null) {
    isShown = meme._ownerId == userData.id;
    } else {
        isShown = false;
    }
    
    ctx.render(detailsTemplate(meme, isShown, onDelete))

        async function onDelete() {
            await deleteItem(ctx.params.id)
            ctx.page.redirect('/allMemes')
        }

    

}