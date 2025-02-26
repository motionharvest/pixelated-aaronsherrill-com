// Setup a console
import { createConsole } from "./utils/console.js";
import { navigateTo, setupRouter } from "./router.js";
import { initScene } from "./sceneManager.js";


// Initialize the console on page load
createConsole();
console.log("runngin")
// Initialize the scene and router
initScene();
setupRouter();

// Example button for navigation
document.getElementById("cube-button").addEventListener("click", () => navigateTo("/cube"));
document.getElementById("sphere-button").addEventListener("click", () => navigateTo("/sphere"));




