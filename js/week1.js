function createLinks() {
    const links = [
        {
            label: "Notes",
            url: "notes.html"
        }
    ]

    var htmlString = "";
    for(var i = 0; i < links.length; i++)
    {
        htmlString += "<li><a href=\"" + links[i].url + "\">" + links[i].label + "</a></li>";
    }
    document.getElementById("links").innerHTML = htmlString;
}