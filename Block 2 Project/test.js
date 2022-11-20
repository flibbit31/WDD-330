const request = buildRequest();

fetch(request)
.then((response) => {
    if(response.ok) {
        return response;
    }
    throw Error(response.statusText);
})
.then(response => { console.log(response.json()); })
.catch(error => console.log('Error!'));

function buildRequest() {
    let url = buildURL();
    let request = new Request(url, {
        method: 'GET',
        mode: 'cors',
        redirect: 'follow',
        cache: 'no-cache'
    });

    return request;
}

function buildURL() {
    const base = "https://api.rawg.io/api/games";
    const key = "6ada6d8ad52f49eaaf0a1fabddeca217";
    const url = base + "?key=" + key;
    return url;
}