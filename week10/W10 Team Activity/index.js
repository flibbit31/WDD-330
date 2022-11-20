import QuakesController from "./QuakesController.js";

const controller = new QuakesController("#quakeList", "#quakeDetails");
console.log(controller.init());