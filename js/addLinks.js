function addLinks(links) {
    let htmlString = "";
    for(let i = 0; i < links.length; i++)
    {
        htmlString += "<li><a href=\"" + links[i].url + "\">" + links[i].label + "</a></li>";
    }
    document.getElementById("links").innerHTML = htmlString;
}

export {
    addLinks
};