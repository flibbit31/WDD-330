import Game from "./game.js";

//console.log(await getPageFromURL(buildOriginalURL()));
console.log(await getAllGames());
//await getAllGames();

async function getAllGames() {
    //is the download finished?
    //wrap this variable so that it can be sent to other functions by reference
    //let finished = { value: false };

    //get the first page of games from the API to figure out pageLength, numPages, and total games
    let url = buildOriginalURL();
    let firstPage = await getPageFromURL(url);
    console.log(firstPage);
    let totalGames = firstPage.count;
    let games = new Array(firstPage.count);
    //console.log(`${url}&page_size=${totalGames}`);
    //await populateGamesFromURL(`${url}&page_size=${totalGames}`, games);
    let secondPage = await getPageFromURL(firstPage.next);
    console.log(secondPage);

    /*let pageLength = currentPage.results.length;
    let numPages = Math.ceil(currentPage.count/pageLength);
    console.log(currentPage);
    console.log(getPageFromURL(currentPage.next));
    console.log(`Count: ${currentPage.count}`);
    console.log(`pageLength: ${pageLength}`);
    console.log(`NumPages: ${numPages}`);
    //holds all of the game objects
    let games = new Array(currentPage.count);
    let gameIndex = 0;


    //download each page and put them into the games array, asynchronously
    for (let pageIndex = 0; pageIndex < numPages; pageIndex++) {
        populateGamesFromURL(url + `&page=${pageIndex + 1}`, games, gameIndex, finished);
        gameIndex += pageLength;
    }*/

    /*//wait for asynchronous functions to be true before ending the function
    waitForFinished(finished);

    console.log(games.length);*/

    //console.log(finished.value);
    /*while(finished.value === false) {
        //one line of code copied from Dan Dascalescu from here: https://stackoverflow.com/questions/951021/what-is-the-javascript-version-of-sleep
        await new Promise(r => setTimeout(r, 500));
    }
    
    console.log("What!!!"); */

    return games;
}

//function copied from Dan Dascalescu from here: https://stackoverflow.com/questions/951021/what-is-the-javascript-version-of-sleep
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

//adapted from pollDOM() at https://www.sitepoint.com/delay-sleep-pause-wait/
function waitForFinished(finished) {
    //console.log(finished.value);
    if(finished.value === true) {
        return;
    }

    else {
        setTimeout(waitForFinished, 500, finished);
    }
}

async function populateGamesFromURL(url, games) {
    let page = await getPageFromURL(url);
    //if(localGameIndex % 1000 === 0) {
        //console.log(page);
    //}
    
    populateGamesFromPage(page, games);

    /*if(page.next === null) {
        console.log("done");
        finished.value = true;
    } */

    //console.log(`Local Index: ${localGameIndex}`);
}

//retrieve a page of games from the api
async function getPageFromURL(url, request = null) {
    if(request === null) {
        request = buildRequest(url);
    }
    
    return fetch(request)
    .then((response) => {
        if(response.ok) {
            return response;
        }

        else {
            console.log(`Error: ${response.statusText}`);
        }
    })
    .then(response => response.json() )
    .catch(error => console.log(`Error: ${error}`));
}

//fill in games array with a page of raw game data
/*function populateGamesFromPage(page, games, localGameIndex) {
    page.results.forEach(rawGame => {
        games[localGameIndex] = new Game(rawGame);
        localGameIndex++;
    });
}*/

function populateGamesFromPage(page, games) {
    for (let i = 0; i < page.results.length; i++) {
        console.log(page.results[i]);
        games[i] = new Game(page.results[i]);
    }
}

function buildRequest(url) {
    let request = new Request(url, {
        method: 'GET',
        mode: 'cors',
        redirect: 'follow',
        cache: 'no-cache'
    });

    return request;
}

function buildOriginalURL() {
    const base = "https://api.rawg.io/api/games";
    const key = "";
    const url = base + "?key=" + key;
    return url;
}