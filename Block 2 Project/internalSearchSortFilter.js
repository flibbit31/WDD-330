import Game from "./game.js";
import { loadGames } from "./ls.js";

export function searchSortFilter(searchString, sortString, filters)
{
    let userGames = loadGames();
    console.log("Before Sorting: ");
    console.log(userGames);

    userGames = filter(userGames, filters);
    userGames = search(userGames, searchString);
    userGames = mySort(userGames, sortString);
    

    console.log("After Sorting: ");
    console.log(userGames);
    return userGames;
}

function search(games, searchString) {
    if(games === null || games.length === 0 || searchString === "") {
        return games;
    }

    let matches = new Array();
    let j = 0;

    //ignore case
    searchString = searchString.toLowerCase();

    //search each game in the list with .includes() ignoring case
    for(let i = 0; i < games.length; i++) {
        if(games[i].name.toLowerCase().includes(searchString)) {
            matches[j] = games[i];
            j++;
        }
    }

    return matches;
}

function mySort(games, sortString) {
    if(sortString === "added") {
        games.sort(compareAdded);
    }

    else if(sortString === "alphabetical") {
        games.sort(compareAlphabetical);
    }

    else if(sortString === "rating") {
        games.sort(compareRating);
    }

    else if(sortString === "userPlayTime") {
        games.sort(compareUserPlayTime);
    }

    else if(sortString === "esrb") {
        games.sort(compareESRB);
    }

    else if(sortString === "metacritic") {
        games.sort(compareMetacritic);
    }

    else if(sortString === "release") {
        games.sort(compareRelease);
    }

    else if(sortString === "update") {
        games.sort(compareUpdate);
    }

    return games;
}

function compareNullCheck(a, b) {
    console.log("Null Check!");
    //if one or both games being compared is null, deal with it here
    if(a === null) {
        if(b === null) {
            return 0;
        }

        else {
            return 1;
        }
    }

    else if(b === null) {
        return -1;
    }

    else {
        return -2;
    }
}

function compareAlphabetical(a, b) {
    const nullCheck = compareNullCheck(a, b);
    if(nullCheck !== -2) {
        return nullCheck;
    }

    const nullCheckAlphebetical = compareNullCheck(a.name, b.name);
    if(nullCheckAlphebetical !== -2) {
        return nullCheckAlphebetical;
    }
    
    return a.name.localeCompare(b.name);
}

function compareAdded(a, b) {
    const nullCheck = compareNullCheck(a, b);
    if(nullCheck !== -2) {
        return nullCheck;
    }

    const nullCheckAdded = compareNullCheck(a.added, b.added);
    if(nullCheckAdded !== -2) {
        return nullCheckAdded;
    }

    return new Date(a.added).getTime() - new Date(b.added).getTime();
}

function compareRating(a, b) {
    const nullCheck = compareNullCheck(a, b);
    if(nullCheck !== -2) {
        return nullCheck;
    }

    const nullCheckRating = compareNullCheck(a.rating, b.rating);
    if(nullCheckRating !== -2) {
        return nullCheckRating;
    }
    
    return a.rating - b.rating;
}

function compareUserPlayTime(a, b) {
    const nullCheck = compareNullCheck(a, b);
    if(nullCheck !== -2) {
        return nullCheck;
    }

    const nullCheckUserPlayTime = compareNullCheck(a.userPlayTime, b.userPlayTime);
    if(nullCheckUserPlayTime !== -2) {
        return nullCheckUserPlayTime;
    }
    
    return a.userPlayTime - b.userPlayTime;
}

function compareESRB(a, b) {
    const nullCheck = compareNullCheck(a, b);
    if(nullCheck !== -2) {
        return nullCheck;
    }
    
    let ratingA = null;
    let ratingB = null;

    if(a.esrbRating !== null) {
        //we don't want to worry about case
        ratingA = a.esrbRating.toLowerCase();
        
    }

    if(b.esrbRating !== null) {
        ratingB = b.esrbRating.toLowerCase();
    }

    //assign a number to each rating, "everyone" being the lowest at 0
    //and unknown at 5
    let ratingNumA = 5;
    if(ratingA === "everyone") {
        ratingNumA = 0;
    }

    else if(ratingA === "everyone 10+") {
        ratingNumA = 1;
    }

    else if(ratingA === "teen") {
        ratingNumA = 2;
    }

    else if(ratingA === "mature") {
        ratingNumA = 3;
    }

    else if(ratingA === "adult-only") {
        ratingNumA = 4;
    }

    else {
        ratingNumA = 5;
    }

    let ratingNumB = 5;
    if(ratingB === "everyone") {
        ratingNumB = 0;
    }

    else if(ratingB === "everyone 10+") {
        ratingNumB = 1;
    }

    else if(ratingB === "teen") {
        ratingNumB = 2;
    }

    else if(ratingB === "mature") {
        ratingNumB = 3;
    }

    else if(ratingB === "adult-only") {
        ratingNumB = 4;
    }

    else {
        ratingNumB = 5;
    }

    return ratingNumA - ratingNumB;
}

function compareMetacritic(a, b) {
    const nullCheck = compareNullCheck(a, b);
    if(nullCheck !== -2) {
        return nullCheck;
    }

    const nullCheckMetacritic = compareNullCheck(a.metacritic, b.metacritic);
    if(nullCheckMetacritic !== -2) {
        return nullCheckMetacritic;
    }
    
    return a.metacritic - b.metacritic;
}

function compareRelease(a, b) {
    const nullCheck = compareNullCheck(a, b);
    if(nullCheck !== -2) {
        return nullCheck;
    }

    const nullCheckRelease = compareNullCheck(a.release, b.release);
    if(nullCheckRelease !== -2) {
        return nullCheckRelease;
    }
    
    //convert to Date format first
    let releaseA = new Date(a.releaseDate);
    let releaseB = new Date(b.releaseDate);

    //compare
    return releaseA.getTime() - releaseB.getTime();
}

function compareUpdate(a, b) {
    const nullCheck = compareNullCheck(a, b);
    if(nullCheck !== -2) {
        return nullCheck;
    }

    const nullCheckUpdate = compareNullCheck(a.update, b.update);
    if(nullCheckUpdate !== -2) {
        return nullCheckUpdate;
    }
    
    //convert to Date format first
    let updateA = new Date(a.updateDate);
    let updateB = new Date(b.updateDate);
 
    //compare
    return updateA.getTime() - updateB.getTime();
}

function filter(games, filters) {
    
    let newGames = new Array();
    let temp = new Array();

    if(filters[0]) {
        //grab each set of Games that matches the filter
        temp = games.filter(game => game.completed);
        console.log(`filter[0] temp: ${JSON.stringify(temp)}`);

        //add the set of Games that matched to the newGames array
        newGames = addArraysWithoutDuplicates(newGames, temp);
    }

    if(filters[1]) {
        //grab each set of Games that matches the filter
        temp = games.filter(game => !game.completed);
        console.log(`filter[1] temp: ${JSON.stringify(temp)}`);

        //add the set of Games that matched to the newGames array
        newGames = addArraysWithoutDuplicates(newGames, temp);
    }

    if(filters[2]) {
        //grab each set of Games that matches the filter
        temp = games.filter(game => game.owned);
        console.log(`filter[2] temp: ${JSON.stringify(temp)}`);

        //add the set of Games that matched to the newGames array
        newGames = addArraysWithoutDuplicates(newGames, temp);
    }

    if(filters[3]) {
        //grab each set of Games that matches the filter
        temp = games.filter(game => !game.owned);
        console.log(`filter[3] temp: ${JSON.stringify(temp)}`);

        //add the set of Games that matched to the newGames array
        newGames = addArraysWithoutDuplicates(newGames, temp);
    }

    return newGames;
}

function addArraysWithoutDuplicates(array1, array2) {
    //mark duplicates in array1 as null

    if(array1 === null) {
        return array2;
    }

    else if(array2 === null) {
        return array1;
    }

    for(let i = 0; i < array1.length; i++) {
        for(let j = 0; j < array2.length; j++) {
            if(array1[i] === array2[j]) {
                array1[i] = null;
                break;
            }
        }
    }

    //remove the null elements in array1
    let i = 0;
    while(i < array1.length) {
        if(array1[i] === null) {
            array1.splice(i, 1);
        }

        else {
            i++;
        }
    }
    
    //add array1 and array2
    let newArray = array1.concat(array2);
    return newArray;
}
