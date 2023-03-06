const tBody = document.querySelector('tbody');
document.getElementById('loadBooks').addEventListener('click', loadAllBooks)
const table = document.querySelector('table');
table.addEventListener('click', onSolution)
const form = document.getElementById('createForm');
const form2 = document.getElementById('editForm');
form2.addEventListener('submit', onEditSubmit);


async function onSolution(event) {
    event.preventDefault();
    if (event.target.textContent == 'Delete') {
        onDelete(event.target)
    } else if (event.target.textContent == 'Edit') {
        onEdit(event.target)
    }
}

async function onEditSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
     
    const id = formData.get('id');
    const author = formData.get('author');
    const title = formData.get('title');

    const result = await updateBook(id, {author, title});
  
    form.style.display = 'block';
    form2.style.display = 'none';

    
    loadAllBooks();
}

async function onDelete(book) {
    const id = book.parentElement.dataset.id;

    await deleteBook(id);

    book.parentElement.parentElement.remove()
}



async function onEdit(button) {
    const id = button.parentElement.dataset.id;
    const book = await getBookById(id);

    form.style.display = 'none';
    form2.style.display = 'block';

    form2.querySelector('input[name="id"]').value = id
    form2.querySelector('input[name="author"]').value = book.author;
    form2.querySelector('input[name="title"]').value = book.title

  
}

async function loadAllBooks() {
    tBody.innerHTML = '';
    const url = 'http://localhost:3030/jsonstore/collections/books';
    const res = await fetch(url);
    const data = await res.json();

    Object.entries(data).forEach(([id, book]) => {
        tBody.innerHTML += `
        <tr>
            <td>${book.title}</td>
            <td>${book.author}</td>
            <td data-id="${id}">
                <button>Edit</button>
                <button>Delete</button>
            </td>
        </tr>`
    });


}


async function getBookById(id) {
    const url = 'http://localhost:3030/jsonstore/collections/books/' + id;
    const res = await fetch(url);
    const data = await res.json();

    return data
}

async function createBook(book) {
    const url = 'http://localhost:3030/jsonstore/collections/books';
    const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(Object.fromEntries(book))
    });

    const data = await res.json();

    return data;
}

async function updateBook(id, book) {
    const url = 'http://localhost:3030/jsonstore/collections/books/' + id;
    const res = await fetch(url, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(book)
    });
    const data = await res.json();

    return data
}

async function deleteBook(id) {
    const url = 'http://localhost:3030/jsonstore/collections/books/' + id;
    const res = await fetch(url, {
        method: 'Delete',
        headers: { 'Content-Type': 'application/json' }
    });
    const data = await res.json();

    loadAllBooks();
    return data

}

form.addEventListener('submit', async (e) => {
    e.preventDefault()
    const formData = new FormData(form)
    const data = [...formData.entries()]

    await createBook(data);
    
    e.target.reset();
    loadAllBooks();
})