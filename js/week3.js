function createLinks() {
    const links = [
        {
            label: "Back",
            url: "../index.html"
        },

        {
            label: "Notes",
            url: "notes.html"
        },

        {
            label: "Team Activity",
            url: "Team Activity week 3.html"
        }
    ];

    let htmlString = "";
    for(let i = 0; i < links.length; i++) {
        htmlString += "<li><a href=\"" + links[i].url + "\">" + links[i].label + "</a></li>";
    }
    document.getElementById("links").innerHTML = htmlString;
}