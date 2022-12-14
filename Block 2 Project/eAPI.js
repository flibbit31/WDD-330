export async function getDataWithRequest(request) {
    if(request === null) {
        return null;
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

export function buildRequest(url) {
    let request = new Request(url, {
        method: 'GET',
        mode: 'cors',
        redirect: 'follow',
        cache: 'no-cache'
    });

    return request;
}

export function buildOriginalURL() {
    const base = "https://api.rawg.io/api/games";
    const key = "6ada6d8ad52f49eaaf0a1fabddeca217";
    const url = base + "?key=" + key;
    return url;
}