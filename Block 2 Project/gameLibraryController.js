import { searchSortFilter } from "./internalSearchSortFilter.js";
import { loadGames } from "./ls.js";

export function getPageOfGames(gamesPerPage, pageNum, searchString, sortString, filters) {
    let allGames = searchSortFilter(searchString, sortString, filters);
    let index = pageNum * gamesPerPage;

    if (index >= allGames.length) {
        return null;
    }

    let pageOfGames = new Array();
    for (let i = 0; (i < gamesPerPage) && ((index + i) < allGames.length); i++) {
        //this might not be a full page

        pageOfGames[i] = allGames[index + i];
    }

    return pageOfGames;
}

export function getGameById(id) {
    const games = loadGames();

    let foundGame = null;

    for(let i = 0; i < games.length; i++) {
        if (id === games[i].id) {
            foundGame = games[i];
            break;
        }
    }

    return foundGame;
}