import { getPageOfGames } from "./gameLibraryController.js"
import { clearLibrary } from "./ls.js";

let page = 0;
const gamesPerPage = 6;

let searchString = "";
let sortString = "";
let filters = new Array();

init();

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

    const clearButton = document.getElementById("clear");
    clearButton.addEventListener("click", clear);

    const previousButton = document.getElementById("previous");
    previousButton.addEventListener("click", () => {
        updatePage(-1);
    });

    const nextButton = document.getElementById("next");
    nextButton.addEventListener("click", () => {
        updatePage(1);
    });

    updateFilters();
    updatePage();
}

function updateSearchString(e) {
    searchString = e.target.value;
    console.log("search string updated to: ");
    console.log(searchString);

    updatePage();
}

function updateSortString(e) {
    sortString = e.target.value;

    updatePage();
}

function updateFilters() {
    filters[0] = document.getElementById("completed").checked;
    console.log(`filters[0]=${filters[0]}`);

    filters[1] = document.getElementById("uncompleted").checked;
    filters[2] = document.getElementById("owned").checked;
    filters[3] = document.getElementById("unowned").checked;

    updatePage();
}

function updatePage(next=0) {
    let gamesDiv = document.getElementById("games");
    gamesDiv.innerHTML = "";

    if(next === 1) {
        page++;
    }

    else if (next === -1) {
        page--;
    }

    const games = getPageOfGames(gamesPerPage, page, searchString, sortString, filters);

    if (games === null) {
        if(next === 1) {
            page--;
        }
    
        else if(next === -1) {
            page++;
        }

        return;
    }

    games.forEach(game => {
        let gameDiv = document.createElement("div");

        let titleElement = document.createElement("h3");
        titleElement.innerHTML = game.name;
        gameDiv.appendChild(titleElement);

        let metacriticElement = document.createElement("p");
        metacriticElement.innerHTML = game.metacritic;
        gameDiv.appendChild(metacriticElement);

        let platformsElement = document.createElement("ul");
        let platforms = game.platforms;
        platforms.forEach(platform => {
            let platformElement = document.createElement("li");
            platformElement.innerHTML = platform;
            platformsElement.appendChild(platformElement);
        });
        gameDiv.appendChild(platformsElement);

        let completedLabel = document.createElement("label");
        completedLabel.setAttribute("for", `completed-${game.id}`);
        completedLabel.innerHTML = "completed";
        gameDiv.appendChild(completedLabel);

        let completedElement = document.createElement("input");
        completedElement.setAttribute("type", "checkbox");
        completedElement.setAttribute("id", `completed-${game.id}`);
        completedElement.checked = game.completed;
        completedElement.disabled = true;
        gameDiv.appendChild(completedElement);

        let ownedLabel = document.createElement("label");
        ownedLabel.setAttribute("for", `owned-${game.id}`);
        ownedLabel.innerHTML = "owned";
        gameDiv.appendChild(ownedLabel);

        let ownedElement = document.createElement("input");
        ownedElement.setAttribute("type", "checkbox");
        ownedElement.setAttribute("id", `owned-${game.id}`);
        ownedElement.checked = game.completed;
        ownedElement.disabled = true;
        gameDiv.appendChild(ownedElement);

        gamesDiv.appendChild(gameDiv);
    });
}

function clear() {
    if(confirm("Are you sure you want to delete your entire library? This action cannot be undone.")) {
        clearLibrary();
    }

    updatePage();
}