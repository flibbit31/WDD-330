import { getPageOfGames } from "./gameLibraryController.js"

let page = -1;
const gamesPerPage = 6;

let searchString = "";
let sortString = "";
let filters = null;

function init() {
    const searchBar = document.getElementById("search");
    searchBar.addEventListener("input", updateSearchString);

    const sortBar = document.getElementById("sort");
    sortBar.addEventListener("input", updateSortString);

    const completed = document.getElementById("completed");
    completed.addEventListener("input", updateFilters);

    const uncompleted = document.getElementById("uncompleted");
    uncompleted.addEventListener("input", updateFilters);

    const owned = document.getElementById("owned");
    owned.addEventListener("input", updateFilters);

    const unowned = document.getElementById("unowned");
    unowned.addEventListener("input", updateFilters);
}

function updateSearchString(e) {
    searchString = e.target.value;
}

function updateSortString(e) {
    sortString = e.target.value;
}

function updateFilters(e) {
    filters[0] = document.getElementById("completed").value;
    filters[1] = document.getElementById("uncompleted").value;
    filters[2] = document.getElementById("owned").value;
    filters[3] = document.getElementById("unowned").value;
}

function changePage(next) {
    const games = getPageOfGames(gamesPerPage, page, searchString, sortString, filters);
    if (games !== null) {
        if(next) {
            page++;
        }
    
        else {
            page--;
        }
    }

    else {
        return;
    }
    
    let gamesDiv = document.getElementById("games");
    games.forEach(game => {
        let gameDiv = document.createElement("div");

        let titleElement = document.createElement("h3");
        titleElement.innerHTML = game.name;
        gameDiv.appendChild(titleElement);

        let metacriticElement = document.getElementById("p");
        metacriticElement.innerHTML = game.metacritic;
        gameDiv.appendChild(metacriticElement);

        let platformsElement = document.createElement("ul");
        let platforms = game.platforms;
        platforms.forEach(platform => {
            let platformElement = document.createElement("li");
            platformElement.innerHTML = platform.name;
            platformsElement.appendChild(platformElement);
        });
        gameDiv.appendChild(platformsElement);

        let completedElement = document.createElement("input");
        completedElement.setAttribute("type", "checkbox");
        completedElement.checked = game.completed;
        completedElement.disabled = true;
        gameDiv.appendChild(completedElement);

        let ownedElement = document.createElement("input");
        ownedElement.setAttribute("type", "checkbox");
        ownedElement.checked = game.completed;
        ownedElement.disabled = true;
        gameDiv.appendChild(ownedElement);
    });
}