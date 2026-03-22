// PROYECTO FLORES AMARILLAS CON PÉTALOS
// Repositorio: Flores-amarillas-

// Configuración del lienzo
const canvas = document.getElementById('flowerCanvas');
const ctx = canvas.getContext('2d');

// Ajustar tamaño del lienzo a la pantalla
function ajustarCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
ajustarCanvas();
window.addEventListener('resize', ajustarCanvas);

// Clase para crear flores con pétalos
class Flor {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.tamano = Math.random() * 40 + 20; // Tamaño entre 20 y 60
        this.velocidadX = (Math.random() - 0.5) * 2;
        this.velocidadY = (Math.random() - 0.5) * 2;
        this.numPetalos = Math.floor(Math.random() * 4) + 5; // 5 a 8 pétalos
    }

    dibujar() {
        // Centro de la flor
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.tamano * 0.2, 0, Math.PI * 2);
        ctx.fillStyle = '#FFD700';
        ctx.fill();

        // Pétalos alrededor
        for (let i = 0; i < this.numPetalos; i++) {
            const angulo = (i * Math.PI * 2) / this.numPetalos;
            const xPetalo = this.x + Math.cos(angulo) * this.tamano * 0.7;
            const yPetalo = this.y + Math.sin(angulo) * this.tamano * 0.7;

            ctx.beginPath();
            ctx.ellipse(
                xPetalo, yPetalo, 
                this.tamano * 0.4, this.tamano * 0.2, 
                angulo, 0, Math.PI * 2
            );
            ctx.fillStyle = '#FFC107';
            ctx.fill();
            ctx.strokeStyle = '#FFFACD';
            ctx.stroke();
        }
    }

    actualizar() {
        this.x += this.velocidadX;
        this.y += this.velocidadY;

        // Rebotar en los bordes
        if (this.x < 0 || this.x > canvas.width) this.velocidadX *= -1;
        if (this.y < 0 || this.y > canvas.height) this.velocidadY *= -1;
    }
}

// Crear flores iniciales
let flores = [];
function crearFloresIniciales() {
    for (let i = 0; i < 15; i++) {
        flores.push(new Flor());
    }
}
crearFloresIniciales();

// Animación principal
function animar() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    flores.forEach(flor => {
        flor.actualizar();
        flor.dibujar();
    });
    requestAnimationFrame(animar);
}
animar();

// Botón para agregar más flores
document.getElementById('btnMasFlores').addEventListener('click', () => {
    for (let i = 0; i < 10; i++) {
        flores.push(new Flor());
    }
});
