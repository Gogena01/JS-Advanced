import { getBooks, html, until } from './utility.js'
//list modules:
//display list of books
//control books(edit, delete)
const catalogTemplate = (booksPromise) => html`
<table>
    <thead>
        <tr>
            <th>Title</th>
            <th>Author</th>
            <th>Action</th>
        </tr>
    </thead>
    <tbody>
        ${until(booksPromise, html`<tr>
            <td colSpan="3">Loading&hellip;</td>
        </tr>`)}

    </tbody>
</table>`

const bookRow = (book, onEdit) => html`
<tr>
    <td>${book.title}</td>
    <td>${book.author}</td>
    <td>
        <button @click=${onEdit}>Edit</button>
        <button>Delete</button>
    </td>
</tr>`


export function showCatalog(ctx) {
    return catalogTemplate(loadBooks(ctx));
}

async function loadBooks(ctx) {
    const data = await getBooks();

    const books = Object.entries(data).map(([k, v]) => Object.assign(v, { _id: k }));


    return Object.values(books).map(book => bookRow(book, toggleEditor.bind(null, book, ctx)))
}

function toggleEditor(book, ctx) {
    ctx.book = book;
    ctx.update();
}