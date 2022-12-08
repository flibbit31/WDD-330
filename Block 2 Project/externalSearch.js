import Game from "./game.js";
import { getDataWithRequest, buildOriginalURL, buildRequest } from "./eAPI.js";

search("Xenoblade");

export async function search(name, numGames = -1) {
    const baseURL = buildOriginalURL();
    const url = `${baseURL}&search=${name}`;
    const request = buildRequest(url);
    const data = await getDataWithRequest(request);
    console.log(data);

    //if numGames is -1, return all games 
    if(numGames === -1) {
        numGames = data.results.length;
    }

    let games = new Array(numGames);
    for(let i = 0; i < games.length; i++) {
        if (data.results[i] !== undefined) {
            games[i] = new Game(data.results[i]);
        }
    }

    return games;
}