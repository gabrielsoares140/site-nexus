// Scroll suave para seções
function scrollToSection(section) {
    document.querySelector(section).scrollIntoView({
        behavior: 'smooth'
    });
}

// Animação hover nas cartas
const cards = document.querySelectorAll('.card');

cards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.boxShadow = '0px 8px 20px #6d4aff';
    });

    card.addEventListener('mouseleave', () => {
        card.style.boxShadow = 'none';
    });
});
