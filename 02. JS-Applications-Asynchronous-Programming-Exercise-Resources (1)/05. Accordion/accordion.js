async function solution() {

    await getAllArticles();

}



async function getAllArticles() {
    const url = 'http://localhost:3030/jsonstore/advanced/articles/list';
    const res = await fetch(url);
    const data = await res.json();

    const main = document.getElementById('main')
    Object.values(data).forEach(a => {
        const div = document.createElement('div');
        div.className = 'accordion';

        div.innerHTML = `
        <div class="head">
            <span>${a.title}</span>
            <button class="button" id="${a._id}">More</button>
        </div>
        <div class="extra">
            <p></p>
        </div>`;

        main.appendChild(div);




        const buttons = main.querySelectorAll('button');
        buttons.forEach(b => b.addEventListener('click', solve))
        function solve(e) {
            const profile = e.target.parentNode.parentNode
            if (e.target.textContent == 'More') {
                getArticleById(e.target.id)
                e.target.textContent = 'Hide'
            } 

            async function getArticleById(id) {
                const url = `http://localhost:3030/jsonstore/advanced/articles/details/${id}`;
                const res = await fetch(url);
                const data = await res.json();

                profile.querySelector('p').textContent = data.content


            }



        }
    })


}







/*<div class="accordion">
            <div class="head">
                <span>Scalable Vector Graphics</span>
                <button class="button" id="ee9823ab-c3e8-4a14-b998-8c22ec246bd3">More</button>
            </div>
            <div class="extra">
                <p>Scalable Vector Graphics .....</p>
            </div>
        </div> */