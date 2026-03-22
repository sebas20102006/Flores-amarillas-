// PROYECTO GIRASOLES CORRECTOS
const canvas = document.getElementById('flowerCanvas');
const ctx = canvas.getContext('2d');

function ajustarCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
ajustarCanvas();
window.addEventListener('resize', ajustarCanvas);

class Girasol {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.tam = Math.random() * 50 + 30;
        this.numPetalos = 16 + Math.floor(Math.random() * 4);
    }

    dibujar() {
        // CENTRO MARRÓN OSCURO
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.tam * 0.35, 0, Math.PI * 2);
        const gradCentro = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.tam * 0.35);
        gradCentro.addColorStop(0, '#3E2723');
        gradCentro.addColorStop(1, '#5D4037');
        ctx.fillStyle = gradCentro;
        ctx.fill();

        // PÉTALOS AMARILLOS LARGOS
        for (let i = 0; i < this.numPetalos; i++) {
            const ang = (i * Math.PI * 2) / this.numPetalos;
            const xP = this.x + Math.cos(ang) * this.tam * 0.8;
            const yP = this.y + Math.sin(ang) * this.tam * 0.8;

            ctx.beginPath();
            ctx.moveTo(this.x, this.y);
            ctx.quadraticCurveTo(
                this.x + Math.cos(ang) * this.tam * 0.5,
                this.y + Math.sin(ang) * this.tam * 0.5,
                xP, yP
            );
            ctx.quadraticCurveTo(
                xP + Math.cos(ang) * this.tam * 0.2,
                yP + Math.sin(ang) * this.tam * 0.2,
                this.x, this.y
            );
            const gradPet = ctx.createLinearGradient(this.x, this.y, xP, yP);
            gradPet.addColorStop(0, '#FFEB3B');
            gradPet.addColorStop(1, '#FBC02D');
            ctx.fillStyle = gradPet;
            ctx.fill();
        }
    }
}

let girasoles = [];
function init() {
    for (let i = 0; i < 10; i++) girasoles.push(new Girasol());
}
init();

function animar() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    girasoles.forEach(g => g.dibujar());
    requestAnimationFrame(animar);
}
animar();

document.getElementById('btnMasFlores').addEventListener('click', () => {
    for (let i = 0; i < 5; i++) girasoles.push(new Girasol());
});
