async function lockedProfile() {
    const url = 'http://localhost:3030/jsonstore/advanced/profiles';
    const res = await fetch(url);
    const data = await res.json();
    const main = document.getElementById('main');

    Object.entries(data).forEach(b => {
        const div = document.createElement('div');
        div.className = 'profile'
        div.innerHTML = `
				<img src="./iconProfile2.png" class="userIcon" />
				<label>Lock</label>
				<input type="radio" name="user1Locked" value="lock" checked>
				<label>Unlock</label>
				<input type="radio" name="user1Locked" value="unlock"><br>
				<hr>
				<label>Username</label>
				<input type="text" name="user1Username" value="${b[1].username}" disabled readonly />
				<div class="hiddenInfo">
					<hr>
					<label>Email:</label>
					<input type="email" name="user1Email" value="${b[1].email}" disabled readonly />
					<label>Age:</label>
					<input type="email" name="user1Age" value="${b[1].age}" disabled readonly />
				</div>
				
				<button>Show more</button>`;

        main.appendChild(div)
    })


    main.querySelectorAll('button').forEach(b => b.addEventListener('click', solve))

    function solve(e) {
        const profile = e.target.parentElement;
        if (e.target.textContent == 'Show more') {

            if (profile.querySelector('div[class="hiddenInfo"]').style.display == "none") {
                profile.querySelector('div[class="hiddenInfo"]').style.display = 'block';
                e.target.textContent = 'Hide it'
            } else {
                profile.querySelector('div[class="hiddenInfo"]').style.display = 'none';
                e.target.textContent = 'Show more'
            }
        } else if (e.target.textContent == 'Hide it') {
            profile.querySelector('div[class="hiddenInfo"]').style.display = 'none';
            e.target.textContent = 'Show more'
        }
    }
}