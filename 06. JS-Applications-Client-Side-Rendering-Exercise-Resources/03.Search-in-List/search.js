import { html, render } from './node_modules/lit-html/lit-html.js'
import { towns as townNames } from './towns.js'
//template:
//unsorted list
//highlight element based on search result
const listTemplate = (town) => html`
<ul>
   ${town.map(t => html`<li class=${t.match ? 'active'  : '' }>${t.name}</li>`)}
</ul>`;


//start:
//load parse data
//call update
//add event listener to search field
const towns = townNames.map(t => ({ name: t, match: false }))
const root = document.getElementById('towns');
const input = document.getElementById('searchText');
const output = document.getElementById('result');
document.querySelector('button').addEventListener('click', onSearch)
update();

//update:
//render template
function update() {
   render(listTemplate(towns), root);
}

//on search:
//read input value
//compare with town names and modify data
// output result
//call update
function onSearch() {
   const match = input.value.trim().toLocaleLowerCase();
   let matches = 0;

   for (let town of towns) {
      if(match && town.name.toLocaleLowerCase().includes(match)){
         town.match = true;
         matches++
      } else {
         town.match = false;
      }
      
   }

   //const matches = towns.filter(t => match && t.name.toLocaleLowerCase().includes(match)).length;

   output.textContent = `${matches} matches found`;
   update();
}

