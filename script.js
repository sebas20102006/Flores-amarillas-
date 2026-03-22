// Selecciona elementos del DOM
const flowerContainer = document.getElementById('flower-container');
const generateBtn = document.getElementById('generate-btn');
const mainText = document.getElementById('main-text');
const subText = document.getElementById('sub-text');

// Función para crear una flor en posición aleatoria
function createFlower() {
    const flower = document.createElement('div');
    flower.classList.add('flower');

    // Posición horizontal aleatoria
    const posX = Math.random() * 100;
    flower.style.left = `${posX}%`;

    // Duración de animación aleatoria
    const animationDuration = 4 + Math.random() * 6;
    flower.style.animationDuration = `${animationDuration}s`;

    // Añade la flor al contenedor
    flowerContainer.appendChild(flower);

    // Elimina la flor después de la animación
    setTimeout(() => {
        flower.remove();
    }, animationDuration * 1000);
}

// Genera flores automáticamente cada 500ms
setInterval(createFlower, 500);

// Genera más flores al hacer clic en el botón
generateBtn.addEventListener('click', () => {
    for (let i = 0; i < 10; i++) {
        setTimeout(() => createFlower(), i * 100);
    }

    // Cambia el texto temporalmente
    const originalMain = mainText.textContent;
    const originalSub = subText.textContent;
    mainText.textContent = '¡Te Quiero Mucho!';
    subText.textContent = '❤️ Flores con Amor ❤️';

    setTimeout(() => {
        mainText.textContent = originalMain;
        subText.textContent = originalSub;
    }, 2000);
});

// Opcional: Permite personalizar el texto desde la consola o añadir un formulario
function customizeMessage(main, sub) {
    mainText.textContent = main;
    subText.textContent = sub;
}
// Ejemplo: customizeMessage('Feliz Día', 'Para mi Amor');
