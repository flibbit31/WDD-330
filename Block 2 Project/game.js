export default class Game {
    constructor(rawGame) {
        this.id = rawGame.id;
        this.name = rawGame.name;
        this.esrbRating = rawGame.esrb_rating.name;
        this.genres = this.extractGenres(rawGame);
        this.metacritic = rawGame.metacritic;
        //this.playTime = rawGame.playtime;
        this.platforms = this.extractPlatforms(rawGame);
        this.releaseDate = new Date(rawGame.released);
        this.updatedDate = new Date(rawGame.updated);
    }

    extractGenres(rawGame) {
        let g = new Array(rawGame.genres.length);
        for (let i = 0; i < rawGame.genres.length; i++) {
            g[i] = rawGame.genres[i].name;
        }

        return g;
    }

    extractPlatforms(rawGame) {
        let p = new Array(rawGame.platforms.length);
        for (let i = 0; i < rawGame.platforms.length; i++) {
            p[i] = rawGame.platforms[i].platform.name;
        }

        return p;
    }


}