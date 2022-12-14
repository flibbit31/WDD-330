import { search } from "./externalSearch.js";
import { addGame, loadGames, clearLibrary } from "./ls.js";

console.log("Game Library");
console.log(loadGames());
init();

function init() {
    let title = document.getElementById("name");
    title.addEventListener("input", titleChanged);

    let addGameButton = document.getElementById("add");
    addGameButton.addEventListener("click", submitForm);
}

async function titleChanged(e) {
    //anytime the title input field is changed the game is no longer found
    let titleElement = e.target;
    titleElement.classList.remove("found");
    titleElement.classList.remove("found-error");

    const title = titleElement.value;

    //search for the title and return top 5 search results
    const numGames = 5;
    let games = await search(title, numGames);
    console.log(games);

    let suggestedGamesElement = document.getElementById("suggested-games");
    suggestedGamesElement.innerHTML = "";

    for(let i = 0; i < games.length; i++) {
        //if current game is empty, break
        if(games[i] === undefined) {
            break;
        }

        //create game div
        let game = document.createElement("div");
        game.classList.add("suggested-game");

        //create and add title
        let titleElement = document.createElement("h3");
        titleElement.style.pointerEvents = "none";
        titleElement.innerHTML = games[i].name;
        game.appendChild(titleElement);

        //create and add platforms
        let platformsElement = document.createElement("ul");
        platformsElement.style.pointerEvents = "none";
        let platforms = games[i].platforms;
        console.log(`Platforms: ${platforms}`);
        platforms.forEach(platform => {
            let platformElement = document.createElement("li");
            platformElement.innerHTML = platform;
            platformsElement.appendChild(platformElement);
        });
        game.appendChild(platformsElement);

        //allow user to click suggested-game
        game.addEventListener("click", e => {
            //change form title and class to found
            let titleElement = document.getElementById("name");
            console.log(e.target);
            titleElement.value = e.target.getElementsByTagName("h3")[0].innerHTML;
            titleElement.classList.add("found");
        });
        //add game div
        suggestedGamesElement.appendChild(game);
    }
}

async function submitForm(e) {
    e.preventDefault();
    let titleElement = document.getElementById("name");
    //only submit found games
    if(!titleElement.classList.contains("found")) {
        titleElement.classList.add("found-error");
        return;
    }

    //retrieve found game from RAWG API
    let temp = await search(titleElement.value, 1);
    let game = temp[0];

    //add in user information to game
    game.completed = document.getElementById("completed").checked;
    game.owned = document.getElementById("owned").checked;

    let ratingElement = document.getElementById("rating");
    if(ratingElement.value !== "") {
        game.rating = document.getElementById("rating").value;
    }
    
    let hoursElement = document.getElementById("hours");
    let minutesElement = document.getElementById("minutes");
    if (hoursElement.value !== "") {
        if (minutesElement.value !== "") {
            //game.setUserPlayTimeInHoursAndMinutes(hoursElement.value, minutesElement.value);
            game.userPlayTime = (Number(hoursElement.value) * 60) + Number(minutesElement.value);
        }

        else {
            //game.setUserPlayTimeInHours(hoursElement.value);
            game.userPlayTime = hoursElement.value * 60;
        }
    }

    //add date and time of game being added to library
    game.added = new Date();

    //add game to saved games library
    addGame(game);

    //go back to library
    location.href="gameLibrary.html";
}