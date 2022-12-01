import Game from "./game.js";

function saveGames(games) {
    const jsonString = JSON.stringify(games);
    localStorage.setItem("games", jsonString);
}

function loadGames() {
    let jsonString = localStorage.getItem("games");
    if(jsonString === null) {
        return new Array();
    }

    else {
        return JSON.parse(jsonString);
    }
}