import Auth from "./auth.js"
import { makeRequest } from "./authHelpers.js"

/*makeRequest('login', 'POST', { 
    password: 'user1', 
    email: 'user1@email.com'
});*/

let auth = null;
init();

function init() {
    auth = new Auth();
    let form = document.getElementById("login");
    form.addEventListener("submit", (event) => {
        event.preventDefault();
        auth.login(getPosts);
    });
}

async function getPosts() {
    //console.log(`Username: ${auth.user} Token: ${auth.token}`);

    let posts = await makeRequest('posts', 'GET', null, auth.token);
    console.log(posts);
    await displayPosts(posts);
}

async function displayPosts(posts) {
    let postList = document.getElementById("postList");
    posts.forEach(post => {
        let item = document.createElement("li");
        let html = `<h3>${post.title}</h3>${post.content}`;
        item.innerHTML = html;
        postList.appendChild(item);
    });
}



