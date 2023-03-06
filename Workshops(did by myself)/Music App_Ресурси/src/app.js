import { logout } from "./api/data.js";
import {page, render} from "./lib.js";
import { getUserData } from "./util.js";
import { catalogPage } from "./views/catalog.js";
import { createPage } from "./views/create.js";
import { detailsPage } from "./views/details.js";
import { editPage } from "./views/edit.js";
import { homePage } from "./views/home.js";
import { loginPage } from "./views/login.js";
import { registerPage } from "./views/register.js";
import { searchPage } from "./views/search.js";

const root = document.querySelector('main');
document.getElementById('logoutBtn').addEventListener('click', onLogout)

page(decorateContext);
page('/', homePage);
page('/catalog', catalogPage);
page('/create', createPage);
page('/search', searchPage);
page('/login', loginPage);
page('/register', registerPage);
page('/details/:id', detailsPage);
page('/edit/:id', editPage);

updateUserNav()
page.start()


function decorateContext(ctx, next) {
    ctx.render = (content) => render(content, root);
    ctx.updateUserNav = updateUserNav;
    next();
}

function updateUserNav() {
    const userData = getUserData();
    if(userData != null) {
        document.querySelector('.guest').style.display = 'none'
        document.querySelector('.user').style.display = 'inline'
    } else {
        document.querySelector('.guest').style.display = 'inline'
        document.querySelector('.user').style.display = 'none'
    }
    
}


async function onLogout() {
    await logout();
    updateUserNav();
}

