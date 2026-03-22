// PROYECTO: FLORES COMO GIRASOLES REALES
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
        this.tamano = Math.random() * 60 + 40; // Tamaño más grande
        this.numPetalos = 18 + Math.floor(Math.random() * 6); // 18-23 pétalos
        this.anguloGiro = Math.random() * 0.1; // Movimiento suave
    }

    dibujar() {
        // CENTRO MARRÓN OSCURO (como en la imagen)
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.tamano * 0.35, 0, Math.PI * 2);
        // Gradiente en el centro
        const gradCentro = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.tamano * 0.35);
        gradCentro.addColorStop(0, '#5D4037');
        gradCentro.addColorStop(0.5, '#3E2723');
        gradCentro.addColorStop(1, '#1B5E20');
        ctx.fillStyle = gradCentro;
        ctx.fill();

        // PÉTALOS LARGOS Y PUNTIAGUDOS (como el girasol)
        for (let i = 0; i < this.numPetalos; i++) {
            const angulo = (i * Math.PI * 2) / this.numPetalos + this.anguloGiro;
            const xPet = this.x + Math.cos(angulo) * this.tamano * 0.8;
            const yPet = this.y + Math.sin(angulo) * this.tamano * 0.8;

            // Forma de pétalo puntiagudo
            ctx.beginPath();
            ctx.moveTo(this.x, this.y); // Unir al centro
            ctx.quadraticCurveTo(
                this.x + Math.cos(angulo) * this.tamano * 0.5, 
                this.y + Math.sin(angulo) * this.tamano * 0.5, 
                xPet, yPet
            );
            ctx.quadraticCurveTo(
                xPet + Math.cos(angulo) * this.tamano * 0.2, 
                yPet + Math.sin(angulo) * this.tamano * 0.2, 
                this.x, this.y
            );

            // Gradiente amarillo dorado como en la imagen
            const gradPetalo = ctx.createLinearGradient(this.x, this.y, xPet, yPet);
            gradPetalo.addColorStop(0, '#FFEB3B');
            gradPetalo.addColorStop(0.5, '#FFC107');
            gradPetalo.addColorStop(1, '#FBC02D');
            ctx.fillStyle = gradPetalo;
            ctx.fill();

            // Contorno fino
            ctx.strokeStyle = '#FFF8E1';
            ctx.lineWidth = 0.8;
            ctx.stroke();
        }

        // Actualizar giro suave
        this.anguloGiro += 0.002;
    }
}

// Crear girasoles
let girasoles = [];
for (let i = 0; i < 8; i++) girasoles.push(new Girasol());

// Animación
function animar() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    girasoles.forEach(girasol => girasol.dibujar());
    requestAnimationFrame(animar);
}
animar();

// Botón para más girasoles
document.getElementById('btnMasFlores').addEventListener('click', () => {
    for (let i = 0; i < 3; i++) girasoles.push(new Girasol());
});
        
