document.getElementById('create-form').addEventListener('submit', onCreateForm)
userData = JSON.parse(sessionStorage.getItem('userData'));
const main = document.querySelector('.wrapper');
main.addEventListener('click', onSolution);
const span = document.querySelectorAll('span');

async function onSolution(event) {
  event.preventDefault();
  if (event.target.textContent == 'Buy') {
    onBuy(event.target)
  } else if (event.target.textContent == 'Create') {
    await onCreateForm(event.target)
  }
}

function onBuy(item) {
  const parent = item.parentElement
  const checkbox = parent.querySelector('input[type="checkbox"]');
  const par = parent.querySelectorAll('p')
  const p = parent.querySelector('.price')

  if (checkbox.checked) {
    span[0].innerHTML += par[0].innerText;
    span[1].innerHTML += Number(p.innerText);
    console.log('It`s ok');
  }
}

async function onCreateForm(item) {
  const inputs = item.parentElement.querySelectorAll('input')

  const data = {
    name: inputs[0].value,
    price: inputs[1].value,
    factor: inputs[2].value,
    img: inputs[3].value,

  }
  const res = await fetch('http://localhost:3030/data/furniture', {
    method: 'POST',
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

  createPreview(data)
  
}


function createPreview(data) {
  const table = document.querySelector('tbody');
  const element = document.createElement('tr');
  element.innerHTML = `
<td>
  <img src="${data.img}">
</td>
<td>
    <p>${data.name}</p>
</td>
<td>
    <p class="price" value="${data.price}">${data.price}</p>
</td>
<td>
    <p>${data.factor}</p>
</td>
<td>
    <input type="checkbox" checked/>
</td>`


  table.appendChild(element)

}

