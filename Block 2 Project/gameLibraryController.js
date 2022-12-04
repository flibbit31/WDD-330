import { searchSortFilter } from "./internalSearchSortFilter.js";

export function getPageOfGames(gamesPerPage, pageNum, searchString, sortString, filters) {
    let allGames = searchSortFilter(searchString, sortString, filters);
    let index = pageNum * gamesPerPage;

    if (index >= allGames.length) {
        return null;
    }

    let pageOfGames = new Array(gamesPerPage);
    for (let i = 0; (i < gamesPerPage) && ((index + i) < allGames.length); i++) {
        //this might not be a full page

        pageOfGames[i] = allGames[index + i];
    }

    return pageOfGames;
}