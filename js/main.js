function createLinks() {
    const links = [
        {
            label: "Week 1",
            url: "week1/index.html"
        },

        {
            label: "Week 2",
            url: "week2/index.html"
        },

        {
            label: "Week 3",
            url: "week3/index.html"
        },

        {
            label: "Week 4",
            url: "week4/index.html"
        }
    ];

    let htmlString = "";
    for(let i = 0; i < links.length; i++)
    {
        htmlString += "<li><a href=\"" + links[i].url + "\">" + links[i].label + "</a></li>";
    }
    document.getElementById("links").innerHTML = htmlString;
}