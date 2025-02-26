export function transitionOut(scene, onComplete) {
    let opacity = 1;
    function fade() {
        opacity -= 0.05;
        scene.traverse(obj => {
            if (obj.material) obj.material.opacity = Math.max(opacity, 0);
        });
        if (opacity > 0) requestAnimationFrame(fade);
        else onComplete();
    }
    fade();
}

export function transitionIn(scene) {
    let opacity = 0;
    function fade() {
        opacity += 0.05;
        scene.traverse(obj => {
            if (obj.material) obj.material.opacity = Math.min(opacity, 1);
        });
        if (opacity < 1) requestAnimationFrame(fade);
    }
    fade();
}