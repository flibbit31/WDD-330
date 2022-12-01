import Game from "./game.js";
import { loadGames } from "./ls.js";

function searchSortFilter(searchString, sortString, filterStrings)
{
    let userGames = loadGames();
    userGames = search(userGames, searchString);
    userGames = sort(userGames, sortString);
    userGames = filter(userGames, filterStrings);
}

function search(games, searchString) {
    if(games === null || games.length === 0) {
        return games;
    }

    let matches = new Array();
    let j = 0;

    //ignore case
    searchString = searchString.toLowerCase();

    //search each game in the list with .includes() ignoring case
    for(let i = 0; i < games.length; i++) {
        if(games[i].name.toLowerCase().includes(searchString)) {
            matches[j] = games[i].name;
            j++;
        }
    }

    return matches;
}

function sort(games, sortString) {
    if(sortString === "added") {
        games.sort(compareAlphabetical);
    }

    return games;
}

function compareAlphabetical(a, b) {
    return a.name.localeCompare(b);
}