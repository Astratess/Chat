let initialHeight = window.innerHeight;
const body = document.querySelector('body');

window.addEventListener('resize', scale);

function scale() {
    const currentHeight = window.innerHeight;

    if (currentHeight != initialHeight) {
        body.style.height = currentHeight + 'px';
        initialHeight = currentHeight;
    }
}