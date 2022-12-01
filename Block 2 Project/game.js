export default class Game {
    constructor(rawGame) {
        this.id = rawGame.id;
        this.name = rawGame.name;
        this.esrbRating = this.extractESRBRating(rawGame);
        this.genres = this.extractGenres(rawGame);
        this.metacritic = rawGame.metacritic;
        this.playTime = rawGame.playtime * 60;
        this.platforms = this.extractPlatforms(rawGame);
        this.releaseDate = new Date(rawGame.released);
        this.updatedDate = new Date(rawGame.updated);

        //user data defaults
        this.completed = false;
        this.owned = false;
        this.rating = -1; //-1 means no rating
        this.userPlayTime = 0; //user's playing time in minutes.
    }

    extractESRBRating(rawGame) {
        if(rawGame.esrb_rating === null) {
            return null;
        }

        return rawGame.esrb_rating.name;
    }

    extractGenres(rawGame) {
        if(rawGame.genres === null) {
            return null;
        }

        let g = new Array(rawGame.genres.length);
        for (let i = 0; i < rawGame.genres.length; i++) {
            g[i] = rawGame.genres[i].name;
        }

        return g;
    }

    extractPlatforms(rawGame) {
        if(rawGame.platforms === null) {
            return null;
        }

        let p = new Array(rawGame.platforms.length);
        for (let i = 0; i < rawGame.platforms.length; i++) {
            p[i] = rawGame.platforms[i].platform.name;
        }

        return p;
    }

    setPlayTimeInHours(hours) {
        //convert hours to minutes
        this.playTime = hours * 60;
    }

    setUserPlayTimeInHoursAndMinutes(hours, minutes) {
        //convert hours to minutes
        this.userPlayTime = hours * 60 + minutes;
    }
}