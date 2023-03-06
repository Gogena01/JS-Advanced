function attachEvents() {
    document.getElementById('btnLoad').addEventListener('click', loadAllPhones);
    document.getElementById('btnCreate').addEventListener('click', onCreate);

    phonebook.addEventListener('click', onDelete)
}

let inputPerson = document.querySelector('input[id="person"]');
let inputPone = document.querySelector('input[id="phone"]');
const phonebook = document.getElementById('phonebook');
attachEvents();



async function onCreate() {
    let person = inputPerson.value;
    let phone = inputPone.value;


    let result = await createPhone({ person, phone })
}

async function onDelete(event) {
    const id = event.target.dataset.id;
    if(id != undefined) {
        await deletePhone(id);
        event.target.parentElement.remove()
    }
}

async function loadAllPhones() {
    const url = 'http://localhost:3030/jsonstore/phonebook';
    const res = await fetch(url);
    const data = await res.json();


    Object.values(data).map(p => {
        let liElement = document.createElement('li');
        liElement.innerHTML = `${p.person}:${p.phone} <button data-id="${p._id}">DELETE</button>`;
        phonebook.appendChild(liElement)
    })
}

async function createPhone(phone) {
    const url = 'http://localhost:3030/jsonstore/phonebook';

    const res = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(phone)
    });

    const result = res.json();

    return result
}

async function deletePhone(id) {
    const url = 'http://localhost:3030/jsonstore/phonebook/' + id
    const res = await fetch(url, {
        method: 'DELETE'
    })

    const data = res.json();

    return data
}

