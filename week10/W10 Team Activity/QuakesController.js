import { getLocation } from './utilities.js';
import Quake from './Quake.js';
import QuakesView from './QuakesView.js';

// Quake controller
export default class QuakesController {
  constructor(parent, details, position = null) {
    this.parent = parent;
    this.details = details;
    // sometimes the DOM won't exist/be ready when the Class gets instantiated, so we will set this later in the init()
    this.parentElement = null;
    this.detailsElement = null;
    // let's give ourselves the option of using a location other than the current location by passing it in.
    this.position = position || {
      lat: 0,
      lon: 0
    };
    // this is how our controller will know about the model and view...we add them right into the class as members.
    this.quakes = new Quake();
    this.quakesView = new QuakesView();
  }
  async init() {
    // use this as a place to grab the element identified by this.parent, do the initial call of this.initPos(), and display some quakes by calling this.getQuakesByRadius()
    this.parentElement = document.querySelector(this.parent);
    this.detailsElement = document.querySelector(this.details);
    await this.initPos();
    this.getQuakesByRadius(100);
  }
  async initPos() {
    // if a position has not been set
    if (this.position.lat === 0) {
      try {
        const location = await getLocation();
        // try to get the position using getLocation()
        
        this.position.lat = location.coords.latitude;
        this.position.lon = location.coords.longitude;
        // if we get the location back then set the latitude and longitude into this.position
        
      } catch (error) {
        console.log(error);
      }
    }
  }

  async getQuakesByRadius(radius = 100) {
    // this method provides the glue between the model and view. Notice it first goes out and requests the appropriate data from the model, then it passes it to the view to be rendered.
    //set loading message
    this.parentElement.innerHTML = 'Loading...';
    // get the list of quakes in the specified radius of the location
    const quakeList = await this.quakes.getEarthQuakesByRadius(
      this.position,
      100
    );
    // render the list to html
    this.quakesView.renderQuakeList(quakeList, this.parentElement);
    // add a listener to the new list of quakes to allow drill down in to the details
    this.parentElement.addEventListener('click', e => {
      
      let items = document.querySelectorAll("li");
      items.forEach( item => item.classList.remove("selected"));
      e.target.classList.add("selected");
      
      this.getQuakeDetails(e.target.dataset.id);
    }, false);
  }
  async getQuakeDetails(quakeId) {
    // get the details for the quakeId provided from the model, then send them to the view to be displayed
   
    //locate the clicked on quake
    const quake = this.quakes.getQuakeById(quakeId);
    console.log(quake.properties);
    this.quakesView.renderQuake(quake, this.detailsElement);
  }
}