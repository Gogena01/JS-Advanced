import { logout } from "./api/data.js";
import { page, render } from "./lib.js";
import { getUserData } from "./util.js";
import { allMemesPage } from "./views/allMemes.js";
import { createPage } from "./views/create.js";
import { detailsPage } from "./views/details.js";
import { editPage } from "./views/edit.js";
import { homeGuest } from "./views/home.js";
import { loginPage } from "./views/login.js";
import { myProfile } from "./views/myProfile.js";
import { registerPage } from "./views/register.js";




const root = document.querySelector('main');
document.getElementById('logoutBtn').addEventListener('click', onLogout)

page(decorateContext)
page('/', homeGuest);
page('/allMemes', allMemesPage);
page('/myProfile', myProfile );
page('/create', createPage);
page('/login', loginPage);
page('/register', registerPage);
page('/details/:id', detailsPage);
page('/edit/:id', editPage);

updateUserNav();
page.start()


function decorateContext(ctx, next) {
    ctx.render = (content) => render(content, root);
    ctx.updateUserNav = updateUserNav
    next();
}


function updateUserNav() {
    const userData = getUserData();
    if( userData) {
        document.querySelector('.profile').querySelector('span').textContent = `Welcome, ${userData.email}` 
        document.querySelector('.user').style.display = 'block';
        document.querySelector('.guest').style.display = 'none';
    } else {
        document.querySelector('.user').style.display = 'none';
        document.querySelector('.guest').style.display = 'block';
    }
}


async function onLogout() {
    await logout();
    updateUserNav();
    page.redirect('/')
}