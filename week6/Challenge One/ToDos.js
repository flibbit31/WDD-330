//setup global variables
let selectedFilter = "all";
let toDoList = [];
let filteredToDoList = [];
initialize();

function initialize() {
    let numTasks = 0;
    document.getElementById("numTasks").innerHTML = `${numTasks} tasks left`;

    document.getElementById(selectedFilter).classList.add("selected");

    document.getElementById("all").addEventListener("click", changeFilter);
    document.getElementById("active").addEventListener("click", changeFilter);
    document.getElementById("completed").addEventListener("click", changeFilter);

    document.getElementById("addButton").addEventListener("click", addToDo);

    toDoList = loadToDoList();
    updateFilteredToDoList();
}

function changeFilter(event) {
    //remove previous filter selection
    document.getElementById(selectedFilter).classList.remove("selected");

    //change filter selection based on target
    selectedFilter = event.target.id;
    document.getElementById(selectedFilter).classList.add("selected");

    //adjust the filteredToDoList
    updateFilteredToDoList();
}

function addToDo() {
    let toDoName = document.getElementById("taskName").value;
    
    let toDo = {
        timestamp: Date.now(),
        name: toDoName,
        completed: false
    };

    //check to make sure that this task name doesn't already exist in the list
    let duplicate = false;
    for (let i = 0; i < toDoList.length && !duplicate; i++) {
        if (toDoList[i].name === toDo.name) {
            duplicate = true; 
        }
    }

    //add the toDo to the toDoList
    if (!duplicate) {
        toDoList.push(toDo);
        //adjust the filteredToDoList
        updateFilteredToDoList();

        //save the whole list to local storage
        saveToDoList(toDoList);
    } 
}

function render() {
    //render the actual list
    renderFilteredToDoList();

    //update the number of toDos remaining on screen
    renderToDosRemaining();
}

function renderFilteredToDoList() {
    let filteredToDoListHTML = "";
    for (let i = 0; i < filteredToDoList.length; i++) {
        filteredToDoListHTML += `<li class="toDoItem" id=${filteredToDoList[i].name.replace(/\s/g, "_")}>
        <input type="checkbox" class="toDoSubItem" ${filteredToDoList[i].completed ? "checked" : ""} onchange="changeCompleted(event)">
        <p class="toDoSubItem">${filteredToDoList[i].name}</p>
        <button type="button" class="toDoSubItem" onclick="removeToDo(event)">X</button>
        </li>`
    }

    document.getElementById("filteredToDoList").innerHTML = filteredToDoListHTML;
}

function renderToDosRemaining() {
    //calculate number of uncompleted tasks
    let toDosRemaining = 0;
    for (let i = 0; i < toDoList.length; i++) {
        if (!toDoList[i].completed) {
            toDosRemaining++;
        }
    }

    //update html with toDosRemaining
    document.getElementById("numTasks").innerHTML = `${toDosRemaining} task${toDosRemaining === 1 ? "" : "s"} left`;
}

function changeCompleted(event) {
    //find the correct toDo in toDoList
    let found = false;
    for (let i = 0; i < toDoList.length && !found; i++) {
        if(toDoList[i].name.replace(/\s/g, "_") === event.target.parentNode.id) {
            //change the completed value in the toDoList 
            toDoList[i].completed = event.target.checked;

            //exit the loop
            found = true;
        }
    }

    //update the filteredToDoList
    updateFilteredToDoList();

    //save the change
    saveToDoList();
}

function removeToDo(event) {
    //remove the toDo from the toDoList array
    for(let i = 0; i < toDoList.length; i++) {
        if (toDoList[i].name.replace(/\s/g, "_") === event.target.parentNode.id) {
            toDoList.splice(i, 1);
        }
    }

    //remove the toDo from the HTML
    event.target.parentNode.remove();

    //update the filteredToDoList
    updateFilteredToDoList();

    //save the change
    saveToDoList();
}

function updateFilteredToDoList() {
    //start with a blank list
    filteredToDoList = [];

    //all toDos are added to the filtered list
    if (selectedFilter === "all") {
        for (let i = 0; i < toDoList.length; i++) {
            filteredToDoList[i] = toDoList[i];
        }    
    }
    
    //only incomplete toDos are added to the filtered list
    else if (selectedFilter === "active") {
        for (let i = 0, j = 0; i < toDoList.length; i++) {
            if (!toDoList[i].completed) {
                filteredToDoList[j] = toDoList[i];
                j++;
            }
        }
    }

    //only complete toDos are added to the filtered list
    else if (selectedFilter === "completed") {
        for (let i = 0, j = 0; i < toDoList.length; i++) {
            if (toDoList[i].completed) {
                filteredToDoList[j] = toDoList[i];
                j++;
            }
        }
    }

    //render any changes
    render();
}   

function loadToDoList() {
    //load the json data from local storage, convert it to an array,
    //and return it
    let loadingToDoList = [];
    let jsonString = localStorage.getItem("toDoList");
    if (jsonString !== null) {
        loadingToDoList = JSON.parse(jsonString);
    }

    return loadingToDoList;
}

function saveToDoList() {
    //convert the list to JSON then save it to local storage
    let jsonString = JSON.stringify(toDoList);
    localStorage.setItem("toDoList", jsonString);
    console.log("saved");
}
