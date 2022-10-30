import Comments from "./comments.js";

const hikeList = [
    {
      name: "Bechler Falls",
      imgSrc: "falls.jpg",
      imgAlt: "Image of Bechler Falls",
      distance: "3 miles",
      difficulty: "Easy",
      description:
        "Beautiful short hike along the Bechler river to Bechler Falls",
      directions:
        "Take Highway 20 north to Ashton. Turn right into the town and continue through. Follow that road for a few miles then turn left again onto the Cave Falls road.Drive to the end of the Cave Falls road. There is a parking area at the trailhead."
    },
    {
      name: "Teton Canyon",
      imgSrc: "falls.jpg",
      imgAlt: "Image of Bechler Falls",
      distance: "3 miles",
      difficulty: "Easy",
      description: "Beautiful short (or long) hike through Teton Canyon.",
      directions:
        "Take Highway 33 East to Driggs. Turn left onto Teton Canyon Road. Follow that road for a few miles then turn right onto Stateline Road for a short distance, then left onto Alta Road. Veer right after Alta back onto Teton Canyon Road. There is a parking area at the trailhead."
    },
    {
      name: "Denanda Falls",
      imgSrc: "falls.jpg",
      imgAlt: "Image of Bechler Falls",
      distance: "7 miles",
      difficulty: "Moderate",
      description:
        "Beautiful hike through Bechler meadows river to Denanda Falls",
      directions:
        "Take Highway 20 north to Ashton. Turn right into the town and continue through. Follow that road for a few miles then turn left again onto the Cave Falls road. Drive to until you see the sign for Bechler Meadows on the left. Turn there. There is a parking area at the trailhead."
    }
];

const imgBasePath = "//byui-cit.github.io/cit261/examples/";

export default class Hikes {
    constructor(elementId) {
        this.parentElement = document.getElementById(elementId);
        this.backButton = this.buildBackButton();
        //this.addHikeListener();

        this.comments = new Comments();
    }

    getAllHikes() {
        return hikeList;
    }

    getHikeByName(hikeName) {
        return this.getAllHikes().find(hike => hike.name === hikeName);
    }

    showHikeList() {
        this.parentElement.innerHTML = "";
        this.renderHikeList(this.parentElement, hikeList);
    }

    showOneHike(hikeName) {
        console.trace();
        this.parentElement.innerHTML = "";
        const hike = this.getHikeByName(hikeName);
        this.parentElement.appendChild(this.renderOneHikeFull(hike));
    }

    /*addHikeListener() {
        const childrenArray = Array.from(this.parentElement.children);
        childrenArray.forEach(hike => { 
            hike.addEventListener("click", event => { 
                this.showOneHike(event.currentTarget.id);
            });
        });
        //childrenArray.forEach(hike => hike.addEventListener("click", this.showOneHike(hike.id.replaceAll("_", " "))));
    } */

    buildBackButton() {
        const backButton = document.createElement("button");
        backButton.innerHTML = "Back";
        backButton.addEventListener("click", () => { this.showHikeList() });
        //backButton.addEventListener("click", this.showHikeList);

        return backButton;
    }

    getAllComments() {

    }

    renderCommentList() {

    }

    filterCommentsByName() {

    }

    buildSubmitButton() {

    }

    addComment() {

    }

    renderHikeList(parent, hikes) {
        hikes.forEach(hike => {
            parent.appendChild(this.renderOneHikeLight(hike));
        });

        parent.appendChild(this.comments.createCommentsListElement());
    }
    
    renderOneHikeLight(hike) {
        const item = document.createElement("li");
        item.id = hike.name.replaceAll(" ", "_");
      
        item.innerHTML = ` <h2>${hike.name}</h2>
            <div class="image"><img src="${imgBasePath}${hike.imgSrc}" alt="${hike.imgAlt}"></div>
            <div>
                    <div>
                        <h3>Distance</h3>
                        <p>${hike.distance}</p>
                    </div>
                    <div>
                        <h3>Difficulty</h3>
                        <p>${hike.difficulty}</p>
                    </div>
            </div>`;
    
        let detailsButton = document.createElement("button");
        detailsButton.innerHTML = "More Details";
        detailsButton.addEventListener("click", () => { this.showOneHike(hike.name)});
        item.appendChild(detailsButton);
    
        return item;
    }
    
    renderOneHikeFull(hike) {
        const item = document.createElement("li");
        item.id = hike.name.replaceAll(" ", "_");
    
        item.innerHTML = `<h2>${hike.name}</h2>
            <div class="image"><img src="${imgBasePath}${hike.imgSrc}" alt="${hike.imgAlt}"></div>
            <div>
                    <div>
                        <h3>Distance</h3>
                        <p>${hike.distance}</p>
                    </div>
                    <div>
                        <h3>Difficulty</h3>
                        <p>${hike.difficulty}</p>
                    </div>
                    <div>
                        <h3>Description</h3>
                        <p>${hike.description}</p>
                    </div>
                    <div>
                        <h3>Directions</h3>
                        <p>${hike.directions}</p>
                    </div>
            </div>`


        item.appendChild(this.comments.createCommentForm());
        item.appendChild(this.comments.createCommentsListElement());
        item.appendChild(this.backButton);
    
        return item;
    }


}