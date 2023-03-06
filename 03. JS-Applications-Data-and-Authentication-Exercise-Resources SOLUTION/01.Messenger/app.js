function attachEvents() {
    document.getElementById('refresh').addEventListener('click', getAllMessages);
    document.getElementById('submit').addEventListener('click', onSubmit);

    getAllMessages();
}

let inputAuthor = document.querySelector('input[name="author"]');
let inputContent = document.querySelector('input[name="content"]');
const list = document.getElementById('messages');

async function onSubmit() {
    const author = inputAuthor.value;
    const content = inputContent.value;

    const result = await createMessage({author, content});
    
    content.value = '';
    list.value += '\n' + `${author}:${content}`
}

async function getAllMessages() {
    const url = 'http://localhost:3030/jsonstore/messenger';
    const res = await fetch(url);
    const data = await res.json();

    const messages = Object.values(data);
    list.value = messages.map(m => `${m.author}:${m.content}`).join('\n')
}

async function createMessage(message) {
    const url = 'http://localhost:3030/jsonstore/messenger'
    const res = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(message)
    });

    const result = await res.json();

    return result
}



attachEvents();