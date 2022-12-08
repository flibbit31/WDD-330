import Game from "./game.js";

export function clearLibrary() {
    const emptyLibrary = new Array();
    saveGames(emptyLibrary);
}

export function saveGames(games) {
    const jsonString = JSON.stringify(games);
    localStorage.setItem("games", jsonString);
}

export function loadGames() {
    let jsonString = localStorage.getItem("games");
    if(jsonString === null) {
        return new Array();
    }

    else {
        return JSON.parse(jsonString);
    }
}

export function addGame(gameToAdd) {
    let games = loadGames();

    //check for duplicate titles
    games.forEach(game => {
        if(game.name === gameToAdd.name) {
            console.error("User tried to add duplicate title");
            return;
        }
    })

    games.push(gameToAdd);
    saveGames(games);
}