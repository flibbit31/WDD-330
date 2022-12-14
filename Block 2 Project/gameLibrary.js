import { getPageOfGames } from "./gameLibraryController.js";
import { clearLibrary } from "./ls.js";
import { getGameById } from "./gameLibraryController.js";

let page = 0;
const gamesPerPage = 3;

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

    if(next === 1) {
        page++;
    }

    else if (next === -1) {
        page--;
    }

    if(page < 0) {
        page = 0;
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

    gamesDiv.innerHTML = "";
    let gamesTitle = document.createElement("h2");
    gamesTitle.innerHTML = "Your Games";
    gamesDiv.appendChild(gamesTitle);

    games.forEach(game => {
        let gameDiv = document.createElement("div");

        let titleElement = document.createElement("h3");
        //titleElement.style.pointerEvents = "none";
        titleElement.innerHTML = game.name;
        gameDiv.appendChild(titleElement);

        let metacriticElement = document.createElement("p");
        //metacriticElement.style.pointerEvents = "none";
        metacriticElement.innerHTML = `Metacritic Score: ${game.metacritic}`;
        gameDiv.appendChild(metacriticElement);

        let platformsElement = document.createElement("ul");
        let platformTitle = document.createElement("p");
        platformTitle.innerHTML = "Platforms: ";
        //platformsElement.appendChild(platformTitle);
        //platformsElement.style.pointerEvents = "none";
        let platforms = game.platforms;
        platforms.forEach(platform => {
            let platformElement = document.createElement("li");
            platformElement.innerHTML = platform;
            platformsElement.appendChild(platformElement);
        });
        gameDiv.appendChild(platformsElement);

        let ownedLabel = document.createElement("label");
        //ownedLabel.style.pointerEvents = "none";
        ownedLabel.setAttribute("for", `owned-${game.id}`);
        ownedLabel.innerHTML = "owned";
        gameDiv.appendChild(ownedLabel);

        let ownedElement = document.createElement("input");
        //ownedElement.style.pointerEvents = "none";
        ownedElement.setAttribute("type", "checkbox");
        ownedElement.setAttribute("id", `owned-${game.id}`);
        ownedElement.checked = game.owned;
        ownedElement.disabled = true;
        gameDiv.appendChild(ownedElement);

        let completedLabel = document.createElement("label");
        //completedLabel.style.pointerEvents = "none";
        completedLabel.setAttribute("for", `completed-${game.id}`);
        completedLabel.innerHTML = "completed";
        gameDiv.appendChild(completedLabel);

        let completedElement = document.createElement("input");
        //completedElement.style.pointerEvents = "none";
        completedElement.setAttribute("type", "checkbox");
        completedElement.setAttribute("id", `completed-${game.id}`);
        completedElement.checked = game.completed;
        completedElement.disabled = true;
        gameDiv.appendChild(completedElement);

        //gameDiv should be clickable
        gameDiv.addEventListener("click", e => {
            showDetails(game);
        });

        gamesDiv.appendChild(gameDiv);
    });
}

function showDetails(game) {
    //const game = getGameById(id);

    let gameDiv = document.getElementById("details");
    gameDiv.innerHTML = "";

    let titleElement = document.createElement("h2");
    titleElement.innerHTML = game.name;
    gameDiv.appendChild(titleElement);

    let metacriticElement = document.createElement("p");
    metacriticElement.innerHTML = game.metacritic;
    gameDiv.appendChild(metacriticElement);

    let ratingElement = document.createElement("p");
    if(game.rating > 100) {
        ratingElement.innerHTML = `Your Rating: No Rating Entered`;
    }

    else {
        ratingElement.innerHTML = `Your Rating: ${game.rating}`;
    }
    
    gameDiv.appendChild(ratingElement);

    let platformsElement = document.createElement("ul");
    let platforms = game.platforms;
    platforms.forEach(platform => {
        let platformElement = document.createElement("li");
        platformElement.innerHTML = platform;
        platformsElement.appendChild(platformElement);
    });
    gameDiv.appendChild(platformsElement);

    let genresElement = document.createElement("ul");
    let genres = game.genres;
    genres.forEach(genre => {
        let genreElement = document.createElement("li");
        genreElement.innerHTML = genre;
        genresElement.appendChild(genreElement);
    });
    gameDiv.appendChild(genresElement);

    let ownedLabel = document.createElement("label");
    ownedLabel.setAttribute("for", `owned-${game.id}`);
    ownedLabel.innerHTML = "owned";
    gameDiv.appendChild(ownedLabel);

    let ownedElement = document.createElement("input");
    ownedElement.setAttribute("type", "checkbox");
    ownedElement.setAttribute("id", `owned-${game.id}`);
    ownedElement.checked = game.owned;
    ownedElement.disabled = true;
    gameDiv.appendChild(ownedElement);
    
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

    let esrbElement = document.createElement("p");
    esrbElement.innerHTML = game.esrbRating;
    gameDiv.appendChild(esrbElement);

    /*let playTimeElement = document.createElement("p");
    playTimeElement.innerHTML = `Average Play Time: ${game.playTime} Minutes`;
    gameDiv.appendChild(playTimeElement); */

    let userPlayTimeElement = document.createElement("p");
    userPlayTimeElement.innerHTML = `Your Play Time: ${toHoursAndMinutes(game.userPlayTime)}`;
    gameDiv.appendChild(userPlayTimeElement);

    let releaseElement = document.createElement("p");
    releaseElement.innerHTML = `Release Date: ${new Date(game.releaseDate)}`;
    gameDiv.appendChild(releaseElement);

    let addedElement = document.createElement("p");
    addedElement.innerHTML = `Added to Library: ${new Date(game.added)}`;
    gameDiv.appendChild(addedElement);
}

function toHoursAndMinutes(totalMinutes) {
    console.log(`Total Minutes: ${totalMinutes}`);
    let hours = Math.floor(totalMinutes / 60.0);
    let minutes = totalMinutes % 60.0;

    return `Hours: ${hours} Minutes: ${minutes}`;
}

function clear() {
    if(confirm("Are you sure you want to delete your entire library? This action cannot be undone.")) {
        clearLibrary();
    }

    updatePage();
}