function createLinks() {
    const links = [
        {
            label: "Week 1",
            url: "week1/index.html"
        }
    ]

    var htmlString = "";
    for(var i = 0; i < links.length; i++)
    {
        htmlString += "<li><a href=\"" + links[i].url + "\">" + links[i].label + "</a></li>";
    }
    document.getElementById("links").innerHTML = htmlString;
}