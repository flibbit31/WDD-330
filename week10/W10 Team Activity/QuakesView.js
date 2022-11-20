 // Quake View handler
 export default class QuakesView {
    renderQuakeList(quakeList, listElement) {
      listElement.innerHTML = "";
      //build a list of the quakes...include the title and time of each quake then append the list to listElement. You should also add the id of the quake record as a data- property to the li. ie. <li data-id="">
      quakeList.features.forEach(quake => {
          let item = document.createElement("li");
          item.setAttribute("data-id", quake.id);
          item.innerHTML = `${quake.properties.title}, ${new Date(quake.properties.time)}`
          listElement.appendChild(item);
      });
    }
    renderQuake(quake, element) {
      const quakeProperties = Object.entries(quake.properties);
      console.log(`properties: ${quakeProperties}`);
      
      element.innerHTML = "";

      for (const [key, value] of quakeProperties) {

          let p = document.createElement("p");
          p.innerHTML = `${key}: ${value}`;
          element.appendChild(p);
      }
      // for the provided quake make a list of each of the properties associated with it. Then append the list to the provided element. Notice the first line of this method. Object.entries() is a slick way to turn an object into an array so that we can iterate over it easier! 
    }
  }