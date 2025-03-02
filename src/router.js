import { loadScene } from "./sceneManagerAlt.js";

export function navigateTo(route) {
  console.log("navigageTo called")
    history.pushState({}, "", route); //route is cube or sphere
    loadScene(route);
}

export function setupRouter() {
  console.log("setupRouter called", window.location.pathname);
    window.addEventListener("popstate", () => {
        loadScene(window.location.pathname);
    });

    // Load initial scene
    console.warn("this is just before the error")
    loadScene(window.location.pathname);
    console.log("this is just after the error")
}
