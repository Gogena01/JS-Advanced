const form = document.querySelector('form');

getAllStudents();

const tableBody = document.querySelector('tbody');


async function onCreate() {
    const first = form['firstName'].value;
    const last = form['lastName'].value
    const faculty = form['facultyNumber'].value
    const grad = form['grade'].value;

    console.log(first)

    await createStudent([first, last, faculty, grad])
}

async function getAllStudents() {
    const url = 'http://localhost:3030/jsonstore/collections/students';
    const res = await fetch(url);
    const data = await res.json();



    Object.values(data).forEach(s => {
        tableBody.innerHTML += `
        <tr>
          <th>${s.firstName}</th>
          <th>${s.lastName}</th>
          <th>${s.facultyNumber}</th>
          <th>${s.grade}</th>
        </tr>`
    })
}


async function createStudent(student) {
    const url = 'http://localhost:3030/jsonstore/collections/students';
    const res = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(Object.fromEntries(student))
    })

    const result = await res.json();

    return result;
}


document.addEventListener('submit', async (e) => {
    e.preventDefault()
    const formData = new FormData(form)
    const data = [...formData.entries()]


    await createStudent(data);
    tableBody.innerHTML = '';
    getAllStudents();

})