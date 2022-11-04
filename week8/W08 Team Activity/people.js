let allData = getPeople();

initialize();

function initialize() {
  let displayPeopleButton = document.getElementById("display-people");
  displayPeopleButton.addEventListener("click", displayPeople);
}

function getPeople() {
  return fetch("https://swapi.dev/api/people/").then(response => {
    console.log("Loading Response...");
    
    if(response.ok) {
      let json = response.json();
      console.log(`JSON: ${json}`)
      return json;
    }
    
    else {
      console.log(`Error: ${response.statusText}`);
    }
  })
  .then(data => 
    {
        console.log(`Whole Data: ${data}`);
        console.log(`First: ${data.results}`);
        return data.results;
    })
  .catch(error => console.log("Error: ", error));
}

function displayPeople() {
  //console.log(Object.entries(allData));

  let listElement = document.getElementById("people");
  //console.log(allData.length);
  for (let i = 0; i < allData.length; i++) {
    let item = document.createElement("li");
    
    let htmlString = "";
    let keys = Object.keys(allData[i]);
    keys.forEach(key => {
      htmlString = htmlString + `<p>${key}: ${allData[i].key}</p>`;
    });
    //console.log(htmlString);
    item.innerHTML = htmlString;
    listElement.appendChild(item);
  }
}