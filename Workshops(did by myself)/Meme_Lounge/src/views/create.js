import { createMeme, getMyItems } from '../api/data.js';
import { html } from '../lib.js';
import { getUserData } from '../util.js';


const createTemplate = (onSubmit) => html`
<section id="create-meme">
    <form @submit=${onSubmit} id="create-form">
        <div class="container">
            <h1>Create Meme</h1>
            <label for="title">Title</label>
            <input id="title" type="text" placeholder="Enter Title" name="title">
            <label for="description">Description</label>
            <textarea id="description" placeholder="Enter Description" name="description"></textarea>
            <label for="imageUrl">Meme Image</label>
            <input id="imageUrl" type="text" placeholder="Enter meme ImageUrl" name="imageUrl">
            <input type="submit" class="registerbtn button" value="Create Meme">
        </div>
    </form>
</section>`

export function createPage(ctx) {
    ctx.render(createTemplate(onSubmit))
    async function onSubmit(event) {
        event.preventDefault();
        const formData = [...(new FormData(event.target)).entries()];
        const data = formData.reduce((a, [k, v]) => Object.assign(a, { [k]: v.trim() }), {});

        const missing = formData.filter(([k, v]) => k && v.trim() == '');

        try {
            if (missing.length > 0) {
                const errors = missing.reduce((a, [k]) => Object.assign(a, { [k]: true }), {});
                throw {
                    error: new Error('Please fill all the mandatory fields!'),
                    errors
                }
            }

            const result = await createMeme(data);
            event.target.reset();
            ctx.page.redirect('/details/' + result._id)
        } catch (err) {
            document.getElementById('errorBox').style.display = 'block'
            document.getElementById('notifications').querySelector('span').textContent = err.message
        }
    }

}

