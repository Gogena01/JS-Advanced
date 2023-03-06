let userData = null

window.addEventListener('DOMContentLoaded', () => {
    userData = JSON.parse(sessionStorage.getItem('userData'));
    if (userData != null) {
        document.getElementById('guest').style.display = 'none';
        document.querySelector('#addForm .add').disabled = false
        document.querySelector('span').innerHTML = userData.email
    } else {
        document.getElementById('user').style.display = 'none'
    }

    document.querySelector('.load').addEventListener('click', loadData);

    document.getElementById('addForm').addEventListener('submit', onCreateSubmit)

    document.getElementById('catches').addEventListener('click', onSolution);

    document.getElementById('logout').addEventListener('click', logOut)

});


async function onSolution(event) {
    event.preventDefault();

    if (event.target.textContent == 'Delete') {
        onDelete(event.target)
    } else if (event.target.textContent == 'Update') {
        
        onEdit(event.target)
    }
}

async function onDelete(item) {
    console.log(userData)
    const id = item.dataset.id;

    await deleteData(id);

    item.parentElement.remove()
}

async function onEdit(item) {
    const id = item.dataset.id;
    const inputs = item.parentElement.querySelectorAll('input')
    
    const data = {
        angler:inputs[0].value,
        weight:inputs[1].value,
        species:inputs[2].value,
        location:inputs[3].value,
        captureTime:inputs[4].value
    }

    
    try {
        

        const url = 'http://localhost:3030/data/catches/' + id;
        const res = await fetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'X-Authorization': userData.token
            },
            body: JSON.stringify(data)
        });

        if (res.ok != true) {
            const error = await res.json();
            throw new Error(error.message);
        }
    
        loadData();

    } catch (err) {
        alert(err.message)
    }
}


async function onCreateSubmit(event) {
    event.preventDefault();

    if (!userData) {
        window.location = 'login.html';
        return;
    }

    


    try {
        if (Object.values(data).some(x => x == '')) {
            throw new Error('All fields are required!')
        }

        const res = await fetch('http://localhost:3030/data/catches', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
                'X-Authorization': userData.token
            },
            body: JSON.stringify(data)
        });

        if (res.ok != true) {
            const error = await res.json();
            throw new Error(error.message);
        }

        
        event.target.reset();
        loadData();

    } catch (err) {
        alert(err.message)
    }
}

async function loadData() {
    const res = await fetch('http://localhost:3030/data/catches');
    const data = await res.json();

    document.getElementById('catches').replaceChildren(...data.map(createPreview))
}


function createPreview(item) {
    const isOwner = (userData && item._ownerId == userData.id)


    const element = document.createElement('div');
    element.className = 'catch';
    element.innerHTML = `<label>Angler</label>
<input type="text" class="angler" value="${item.angler}" ${!isOwner ? 'disabled' : ''}>
<label>Weight</label>
<input type="text" class="weight" value="${item.weight}" ${!isOwner ? 'disabled' : ''}>
<label>Species</label>
<input type="text" class="species" value="${item.species}" ${!isOwner ? 'disabled' : ''}>
<label>Location</label>
<input type="text" class="location" value="${item.location}" ${!isOwner ? 'disabled' : ''}>
<label>Bait</label>
<input type="text" class="bait" value="${item.bait}" ${!isOwner ? 'disabled' : ''}>
<label>Capture Time</label>
<input type="number" class="captureTime" value="${item.captureTime}" ${!isOwner ? 'disabled' : ''}>
<button class="update" data-id="${item._id}" ${!isOwner ? 'disabled' : ''}>Update</button>
<button class="delete" data-id="${item._id}" ${!isOwner ? 'disabled' : ''}>Delete</button>`;

    return element;
}

async function deleteData(id) {
    const res = await fetch('http://localhost:3030/data/catches/' + id, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'X-Authorization': userData.token
        }

    });

    const data = await res.json();

    return data;
}


function logOut() {
    sessionStorage.clear();
    document.location.reload()
}



