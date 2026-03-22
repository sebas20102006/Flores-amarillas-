// PROYECTO FLORES AMARILLAS - DETALLES AVANZADOS EN PÉTALOS
const canvas = document.getElementById('flowerCanvas');
const ctx = canvas.getContext('2d');

function ajustarCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
ajustarCanvas();
window.addEventListener('resize', ajustarCanvas);

class Flor {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.tamano = Math.random() * 40 + 20;
        this.velX = (Math.random() - 0.5) * 2;
        this.velY = (Math.random() - 0.5) * 2;
        this.numPetalos = Math.floor(Math.random() * 5) + 5;
        this.brillo = Math.random() * 0.3 + 0.7; // Intensidad de brillo variable
    }

    dibujar() {
        // Centro con detalle de textura
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.tamano * 0.2, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 215, 0, ${this.brillo})`; // Transparencia variable
        ctx.fill();
        ctx.strokeStyle = `rgba(255, 250, 205, ${this.brillo + 0.2})`;
        ctx.lineWidth = 0.5;
        ctx.stroke();

        // Pétalos con textura y gradientes
        for (let i = 0; i < this.numPetalos; i++) {
            const angulo = (i * Math.PI * 2) / this.numPetalos;
            const xPet = this.x + Math.cos(angulo) * this.tamano * 0.7;
            const yPet = this.y + Math.sin(angulo) * this.tamano * 0.7;

            // Gradiente en cada pétalo
            const gradiente = ctx.createLinearGradient(
                xPet - this.tamano * 0.2, yPet, 
                xPet + this.tamano * 0.4, yPet
            );
            gradiente.addColorStop(0, `rgba(255, 193, 7, ${this.brillo})`);
            gradiente.addColorStop(1, `rgba(255, 240, 240, ${this.brillo + 0.1})`);
            
            ctx.beginPath();
            ctx.ellipse(
                xPet, yPet, this.tamano * 0.4, this.tamano * 0.2, 
                angulo, 0, Math.PI * 2
            );
            ctx.fillStyle = gradiente;
            ctx.fill();
            // Detalle de vena en el pétalo
            ctx.beginPath();
            ctx.moveTo(xPet, yPet);
            ctx.lineTo(xPet + Math.cos(angulo) * this.tamano * 0.2, yPet + Math.sin(angulo) * this.tamano * 0.1);
            ctx.strokeStyle = `rgba(255, 210, 0, ${this.brillo})`;
            ctx.lineWidth = 0.3;
            ctx.stroke();
        }
    }

    actualizar() {
        this.x += this.velX;
        this.y += this.velY;
        if (this.x < 0 || this.x > canvas.width) this.velX *= -1;
        if (this.y < 0 || this.y > canvas.height) this.velY *= -1;
    }
}

let flores = [];
function init() {
    for (let i = 0; i < 15; i++) flores.push(new Flor());
}
init();
function animar() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    flores.forEach(flor => {
        flor.actualizar();
        flor.dibujar();
    });
    requestAnimationFrame(animar);
}
animar();

// Botón para más flores
document.getElementById('btnMasFlores').addEventListener('click', () => {
    for (let i = 0; i < 10; i++) flores.push(new Flor());
});
