// Setup a console
import { createConsole } from "./utils/console.js";
import { navigateTo, setupRouter } from "./router.js";
import { initScene } from "./sceneManagerAlt.js";


// Initialize the console on page load
createConsole(true);
// Initialize the scene and router
initScene();
setupRouter();

// anything with a route="" gets navigated to
document.querySelectorAll("[route]").forEach((link) => {
  link.addEventListener("click", () => navigateTo(link.getAttribute("route")));
})




