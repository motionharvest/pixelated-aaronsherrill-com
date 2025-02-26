import { loadScene } from "./sceneManager.js";

export function navigateTo(route) {
    history.pushState({}, "", route); //route is cube or sphere
    loadScene(route);
}

export function setupRouter() {
    window.addEventListener("popstate", () => {
        loadScene(window.location.pathname);
    });

    // Load initial scene
    loadScene(window.location.pathname);
}
