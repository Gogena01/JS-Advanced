import { html, render } from "./node_modules/lit-html/lit-html.js"
import { cats as catData } from './catSeeder.js'

//templates
// contains cat info
// has toggle button
const catCard = (cat, showInfo) => html`
<li>
    <img src="./images/${cat.imageLocation}.jpg" width="250" height="250" alt="Card image cap">
    <div class="info">
        <button @click=${() => toggleInfo(cat)} class="showBtn">${cat.info ? 'Hide' : 'Show'} status code</button>
        ${cat.info ? html`<div class="status" id="${cat.id}">
            <h4>Status Code: ${cat.statusCode}</h4>
            <p>${cat.statusMessage}</p>
        </div>`: null}
    </div>
</li>`;

//start:
// parse to imported data
// pass to template
const root = document.getElementById('allCats');
catData.forEach(c => c.info = false);
upadte();

function upadte() {
    render(html`<ul>${catData.map(catCard)}</ul>`, root);
}


/*root.addEventListener('click', (ev) => {
    if (ev.target.tagName == 'BUTTON') {
        const element = ev.target.parentNode.querySelector('.status');
        if(element.style.display == 'none') {
            element.style.display = 'block';
            ev.target.textContent = 'Hide status code';
        }else {
            element.style.display = 'none';
            ev.target.textContent = 'Show status code';
        }

    }
})*/

function toggleInfo(cat) {
    cat.info = !cat.info
    upadte();
}


